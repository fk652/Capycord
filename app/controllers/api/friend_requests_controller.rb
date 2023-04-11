class Api::FriendRequestsController < ApplicationController
  def index 
    @sent_requests = current_user.sent_friend_requests.where("status='pending'").includes(:receiver)
    @received_requests = current_user.received_friend_requests.where("status='pending'").includes(:sender)
    render :index
  end

  def create
    @receiver = User.find_by(username: params[:username])
    if @receiver
      @friend_request = FriendRequest.new(
        sender_id: current_user.id,
        receiver_id: @receiver.id
      )

      if @friend_request.save
        # broadcast add incoming request to receiver
        receiver = @friend_request.receiver
        FriendsChannel.broadcast_to(
          receiver,
          type: 'ADD_INCOMING_REQUEST',
          **from_template('api/friend_requests/show', friend_request: @friend_request, receiver: receiver)
        )

        render :show, locals: {friend_request: @friend_request, receiver: @receiver}
      else
        render json: { errors: @friend_request.errors }, status: :unprocessable_entity
      end
    else
      render json: { errors: { error: "Hm, didn't work. Double check that the capitalization, spelling, any space, and numbers are correct."} }, status: :unprocessable_entity
    end
  end

  def destroy 
    @request = FriendRequest.find(params[:id])

    if @request.destroy
      # broadcast delete incoming request
      FriendsChannel.broadcast_to(
        @request.receiver,
        type: 'DELETE_INCOMING_REQUEST',
        id: @request.id
      )

      head :no_content
    else
      render json: { errors: @request.errors }, status: :unprocessable_entity
    end
  end

  def update
    @request = FriendRequest.find(params[:id])
    if @request.receiver_id != current_user.id
      render json: { errors: { error: "Only the receiver can update a friend request status"} }, status: :unauthorized
      return
    end

    if @request.update(status: params[:status])
      if params[:status] === "ignored"
        # broadcast delete outgoing request on ignore
        # user = (@request.sender_id === current_user.id ? @request.receiver : @request.sender)
        FriendsChannel.broadcast_to(
          @request.sender,
          type: 'DELETE_SENT_REQUEST',
          id: @request.id
        )

        head :no_content
      elsif  params[:status] === "accepted"
        @friendship = Friend.find_by(user1_id: @request.sender.id, user2_id: current_user.id)

        FriendsChannel.broadcast_to(
          @friendship.user1,
          type: 'ADD_FRIEND',
          **from_template('api/friends/show', friendship: @friendship, friend: current_user)
        )

        FriendsChannel.broadcast_to(
          @request.sender,
          type: 'DELETE_SENT_REQUEST',
          id: @request.id
        )

        render 'api/friends/show', locals: {friendship: @friendship, friend: @friendship.user1}
      else # || params[:status] === "pending"
        head :no_content
      end
    else
      render json: { errors: @request.errors }, status: :unprocessable_entity
    end
  end

  # private
  # def create_params
  #   params.require(:friend_request).permit(:username)
  # end
end
