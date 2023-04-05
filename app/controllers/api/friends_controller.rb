class Api::FriendsController < ApplicationController
  def index
    # might change the table to have user1 and user2 reversed as well
    @friends1 = current_user.friends1
    @friend2 = current_user.friends2
    render :index
  end

  def create

  end

  def destroy 

  end
end
