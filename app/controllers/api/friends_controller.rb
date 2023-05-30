class Api::FriendsController < ApplicationController
  before_action :require_logged_in
  
  def index
    @friendships1 = current_user.friendships1.includes(:user2)
    @friendships2 = current_user.friendships2.includes(:user1)
    render :index
  end

  def destroy 
    friend = Friend.includes(:user1, :user2).find(params[:id])

    if friend.destroy
      # broadcast delete friendship to both sides
      FriendsChannel.broadcast_to(
        friend.user1,
        type: 'DELETE_FRIEND',
        id: friend.id
      )

      FriendsChannel.broadcast_to(
        friend.user2,
        type: 'DELETE_FRIEND',
        id: friend.id
      )

      head :no_content
    else 
      render json: { errors: friend.errors }, status: :unprocessable_entity
    end
  end
end
