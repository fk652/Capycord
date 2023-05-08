class Api::ServersController < ApplicationController
  before_action :require_logged_in
  
  def index
    @servers = current_user.server_memberships
    render :index
  end

  def show
    # get channels, members
  end

  def create
    # @server = Server.new(create_params)
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
    # broadcast to server owner and each server member, through users channel
    # should also update server page live
    @server = Server.includes(:members).find(params[:id]);

    if @server.owner_id == current_user.id 
      if @server.destroy
        @server.members.each do |member|
          p @server.id
          UsersChannel.broadcast_to(
            member,
            type: 'DELETE_SERVER',
            id: @server.id
          )
        end
        
        render json: nil, status: :ok
      else
        render json: { errors: @server.errors }, status: :unprocessable_entity
      end
    else
      render json: { errors: { error: "Must be server owner to delete this server"} }, status: :unauthorized
    end
  end

  def update
    # broadcast to each server member, through users channel
    # should also update server page live
    @server = Server.find(params[:id])
    if @server.owner_id == current_user.id
      if @server.update(update_params)
        @server.members.each do |member|
          UsersChannel.broadcast_to(
            member,
            type: 'UPDATE_SERVER',
            **from_template('api/servers/show', server: @server)
          )
        end

        render json: nil, status: :ok
      else
        render json: { errors: @server.errors }, status: :unprocessable_entity
      end
    else
      render json: { errors: { error: "Must be server owner to edit this server"} }, status: :unauthorized
    end
  end

  private
  def create_params
    params.require(:server).permit(:name, :owner_id, :picture_url)
  end

  def update_params
    params.require(:server).permit(:name, :picture_url)
  end
end
