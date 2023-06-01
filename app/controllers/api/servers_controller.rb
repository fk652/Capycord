class Api::ServersController < ApplicationController
  before_action :require_logged_in
  before_action :verify_owner, only: [:destroy, :update]
  
  def index
    @servers = current_user.server_memberships
    render :index
  end

  def create
    @server = Server.new({
      name: params[:name],
      picture_url: params[:picture_url],
      owner_id: current_user.id
    })

    if @server.save 
      render :show, locals: {server: @server}
    else
      render json: {errors: @server.errors}, status: :unprocessable_entity
    end
  end

  def destroy 
    if @server.destroy
      # broadcast deleted server to every member, through users channel
      @server.members.each do |member|
        p @server.id
        UsersChannel.broadcast_to(
          member,
          type: 'DELETE_SERVER',
          id: @server.id
        )
      end
      
      head :no_content
    else
      render json: { errors: @server.errors }, status: :unprocessable_entity
    end
  end

  def update
    # broadcast updated server info to each server member, through users channel
    if @server.update(update_params)
      @server.members.each do |member|
        UsersChannel.broadcast_to(
          member,
          type: 'UPDATE_SERVER',
          **from_template('api/servers/show', server: @server)
        )
      end

      head :no_content
    else
      render json: { errors: @server.errors }, status: :unprocessable_entity
    end
  end

  private
  def verify_owner
    @server = Server.includes(:members).find(params[:id]);
    if @server.owner_id != current_user.id
      render json: { errors: { error: "Must be server owner"} }, status: :forbidden
    end
  end

  def update_params
    params.require(:server).permit(:name, :picture_url)
  end
end
