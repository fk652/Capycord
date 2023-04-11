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
        render :show
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
      head :no_content
    else
      render json: { errors: @request.errors }, status: :unprocessable_entity
    end
  end

  def update
    @request = FriendRequest.find(params[:id])

    if @request.update(status: params[:status])
      if params[:status] === "ignore" || params[:status] === "pending"
        # if ignored or no change from pending, only update request status
        head :no_content
      else  # params[:status] === "accepted"
        @friendship = Friend.find_by(user1_id: @request.sender.id, user2_id: current_user.id)

        FriendsChannel.broadcast_to(
          @friendship.user1,
          type: 'ADD_FRIEND',
          **from_template('api/friends/show', friendship: @friendship, friend: current_user)
        )

        render 'api/friends/show', locals: {friendship: @friendship, friend: @friendship.user1}
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
