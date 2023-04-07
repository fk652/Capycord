class Api::FriendRequestsController < ApplicationController
  def index 
    @sent_requests = current_user.sent_friend_requests.where("status='pending'").includes(:receiver)
    @received_requests = current_user.received_friend_requests.where("status='pending'").includes(:sender)

    render :index
  end

  def create
    @receiver = User.find_by(username: params[:username])
    if (@receiver)
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
    # cancel sent request
    @request = FriendRequest.find(params[:id])

    if @request
      if @request.destroy
        head :no_content
        return
      else 
        render json: { errors: @request.errors }, status: :unprocessable_entity
      end
    else
      render json: { errors: { error: "Friend request not found"} }, status: :unprocessable_entity
    end
  end

  def update
    @request = FriendRequest.find(params[:id])

    if @request 
      if @request.update(status: params[:status])
        
        if params[:status] === "ignore" || params[:status] === "pending"
          # if ignored, only update request status
          head :no_content
          return
        elsif params[:status] === "accepted"
          # if accepted update status and return new friend
          @friendship = Friend.find_by(user1_id: @request.sender.id, user2_id: current_user.id)
          render 'api/friends/show'
          return
        end
      else
        render json: { errors: @request.errors }, status: :unprocessable_entity
      end
    else
      render json: { errors: { error: "Friend request not found"} }, status: :unprocessable_entity
    end
  end

  private
  def create_params
    params.require(:friend_request).permit(:username)
  end
end
