class Api::FriendsController < ApplicationController
  def index
    # might change the table to have user1 and user2 reversed as well
    @friendships1 = current_user.friendships1.includes(:user2)
    @friendships2 = current_user.friendships2.includes(:user1)
    render :index
  end

  def create

  end

  def destroy 
    # for deleting friends
    @friend = Friend.find(params[:id])

    if @friend
      if @friend.destroy
        head :no_content
      else 
        render json: { errors: @friend.errors }, status: :unprocessable_entity
      end
    else
      render json: { errors: { error: "Friendship not found"} }, status: :unprocessable_entity
    end
  end
end
