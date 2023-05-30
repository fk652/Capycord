class Api::FriendRequestsController < ApplicationController
  before_action :require_logged_in
  before_action :verify_request_sender, only: [:destroy]
  before_action :verify_request_receiver, only: [:update]
  
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
        # broadcast new request to both sides
        receiver = @friend_request.receiver
        FriendsChannel.broadcast_to(
          current_user,
          type: 'ADD_SENT_REQUEST',
          **from_template('api/friend_requests/show', friend_request: @friend_request, user: @receiver)
        )

        FriendsChannel.broadcast_to(
          receiver,
          type: 'ADD_INCOMING_REQUEST',
          **from_template('api/friend_requests/show', friend_request: @friend_request, user: current_user)
        )

        head :no_content
      else
        render json: { errors: @friend_request.errors }, status: :unprocessable_entity
      end
    else
      render json: { errors: { error: "Hm, didn't work. Double check that the capitalization, spelling, any space, and numbers are correct."} }, status: :unprocessable_entity
    end
  end

  def destroy 
    if @request.destroy
      # broadcast delete request to both sides
      FriendsChannel.broadcast_to(
        @request.sender,
        type: 'DELETE_SENT_REQUEST',
        id: @request.id
      )

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
    if @request.update(status: params[:status])
      # broadcast delete request to both sides since request was handled
      FriendsChannel.broadcast_to(
        @request.sender,
        type: 'DELETE_SENT_REQUEST',
        id: @request.id
      )

      FriendsChannel.broadcast_to(
        @request.receiver,
        type: 'DELETE_INCOMING_REQUEST',
        id: @request.id
      )

      if params[:status] === "accepted"
        friendship = Friend.includes(:user1, :user2).find_by(user1_id: @request.sender.id, user2_id: current_user.id)

        # broadcast new friend info to both sides
        FriendsChannel.broadcast_to(
          friendship.user1,
          type: 'ADD_FRIEND',
          **from_template('api/friends/show', friendship: friendship, friend: friendship.user2)
        )

        FriendsChannel.broadcast_to(
          friendship.user2,
          type: 'ADD_FRIEND',
          **from_template('api/friends/show', friendship: friendship, friend: friendship.user1)
        )
      end

      head :no_content
    else
      render json: { errors: @request.errors }, status: :unprocessable_entity
    end
  end

  private
  def verify_request_sender
    @request = FriendRequest.includes(:sender, :receiver).find(params[:id])
    if @request.sender_id != current_user.id
      render json: { errors: { error: "Must be owner to delete this request"} }, status: :unauthorized
    end
  end

  def verify_request_receiver
    @request = FriendRequest.includes(:sender, :receiver).find(params[:id])
    if @request.receiver_id != current_user.id
      render json: { errors: { error: "Only the receiver can update a friend request status"} }, status: :unauthorized
    end
  end
end
