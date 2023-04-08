class Api::MembershipsController < ApplicationController
  def index 
    server = Server.find(params[:server_id]);

    if !server 
      render json: { errors: { error: "Server not found"} }, status: :unprocessable_entity
      return
    elsif !current_user.server_memberships.find(params[:server_id])
      render json: { errors: { error: "Must be a server member to view this information"} }, status: :unauthorized
      return
    else
      @members = server.members
      render :index
    end
  end

  def create

  end

  def destroy 

  end

  def update
    
  end
end
