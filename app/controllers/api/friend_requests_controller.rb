class Api::FriendRequestsController < ApplicationController
  def index 
    @sent_requests = current_user.sent_friend_requests.includes(:receiver)
    @received_requests = current_user.received_friend_requests.includes(:sender)

    render :index
  end

  def create
    @receiver = User.find_by(username: create_params[:friend_request][:receiver_username])
    if (@receiver)
      @friend_request = friend_request.new(
        sender_id: create_params[:friend_request][:sender_id],
        receiver_id: receiver.id
      )

      if @friend_request.save
        render :show
      else
        render json: { errors: @user.errors }, status: :unprocessable_entity
      end
    else
      render json: { errors: { error: "User not found"} }, status: :unprocessable_entity
    end
  end

  def destroy 

  end

  def update
    # if accepted, return new friend

    # if ignored, delete request
  end

  private
  def create_params
    params.require(:friend_request).permit(:sender_id, :receiver_username)
  end
end
