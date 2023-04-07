class Api::ChannelsController < ApplicationController
  def index
    server = Server.find(params[:server_id]);

    # error handle check is current user is member
    if !current_user.server_memberships.find(params[:server_id])
      render json: { errors: { error: "Must be a server member to view this information"} }, status: :unauthorized
      return
    end

    if server
      @channels = server.channels
      render :index
    else
      render json: { errors: { error: "Server not found"} }, status: :unprocessable_entity
    end
  end

  def show
    # might not be needed
  end

  def create
    # verify current user is owner or admin in memberships
  end

  def destroy 
    # verify current user is owner or admin in memberships
  end

  def update
    # verify current user is owner or admin in memberships
  end
end
