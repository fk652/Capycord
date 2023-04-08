class Api::MessagesController < ApplicationController
  def index
    # validate both channel id and server id
    server = Server.find(params[:server_id])
    if !server
      render json: { errors: { error: "Server not found"} }, status: :unprocessable_entity
      return
    elsif !current_user.server_memberships.find(params[:server_id])
      render json: { errors: { error: "Must be a server member to view this information"} }, status: :unauthorized
      return
    else
      channel = Channel.find(params[:channel_id])
      if !channel || (channel.server != server)
        render json: { errors: { error: "Channel not found"} }, status: :unprocessable_entity
        return
      else
        # setup offsets later
        @messages = channel.messages
        render :index
      end
    end
  end

  def show

  end

  def create

  end

  def destroy 

  end

  def update
    
  end
end
