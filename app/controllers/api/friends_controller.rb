class Api::FriendsController < ApplicationController
  before_action :require_logged_in
  
  def index
    # might change the table to have user1 and user2 reversed as well
    @friendships1 = current_user.friendships1.includes(:user2)
    @friendships2 = current_user.friendships2.includes(:user1)
    render :index
  end

  def create
    # might not be needed
  end

  def destroy 
    friend = Friend.find(params[:id])

    if friend.destroy
      user = (friend.user1_id === current_user.id ? friend.user2 : friend.user1)

      FriendsChannel.broadcast_to(
        user,
        type: 'DELETE_FRIEND',
        id: friend.id
      )

      head :no_content
    else 
      render json: { errors: friend.errors }, status: :unprocessable_entity
    end
  end
end
