class Api::MembershipsController < ApplicationController
  def index 
    @memberships = current_user.server_memberships.find(params[:server_id]).memberships.includes(:member)
    if @memberships
      render :index
    else
      render json: {errors: @memberships.errors}, status: :unprocessable_entity
    end

    # server = Server.find(params[:server_id]);
    # if !server 
    #   render json: { errors: { error: "Server not found"} }, status: :unprocessable_entity
    #   return
    # elsif !current_user.server_memberships.find(params[:server_id])
    #   render json: { errors: { error: "Must be a server member to view this information"} }, status: :unauthorized
    #   return
    # else
    #   @memberships = server.memberships.includes(:member)
    #   render :index
    # end
  end

  def create

  end

  def destroy 

  end

  def update
    
  end
end
