class Api::ServersController < ApplicationController
  def index
    @servers = current_user.server_memberships
    render :index
  end

  def show
    # get channels, members
  end

  def create

  end

  def destroy 

  end

  def update

  end
end
