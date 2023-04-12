class Api::ServersController < ApplicationController
  def index
    @servers = current_user.server_memberships
    render :index
  end

  def show
    # get channels, members
  end

  def create
    @server = Server.new(create_params)
    if @server.save 
      
    else
      render json: {errors: @server.errors}, status: :unprocessable_entity
    end
  end

  def destroy 

  end

  def update

  end

  private
  def create_params
    params.require(:server).permit(:name, :owner_id, :picture_url)
  end
end
