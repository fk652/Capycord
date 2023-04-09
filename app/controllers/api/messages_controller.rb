class Api::MessagesController < ApplicationController
  def index
    channel = Channel.find(params[:channel_id])
    if channel
      server = channel.server
      if !current_user.server_memberships.find(server.id)
        render json: { errors: { error: "Must be a server member to view this information"} }, status: :unauthorized
        return
      else
        @messages = channel.messages
        render :index
      end
    else
      render json: { errors: { error: "Channel not found"} }, status: :unprocessable_entity
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
