class Api::MessagesController < ApplicationController
  def index
    channel = Channel.find(params[:channel_id])
    if channel
      server = channel.server
      if current_user.server_memberships.find(server.id)
        @messages = channel.messages
        render :index
      else
        render json: { errors: { error: "Must be a server member to view this information"} }, status: :unauthorized
      end
    else
      render json: { errors: { error: "Channel not found"} }, status: :unprocessable_entity
    end
  end

  def show

  end

  def create
    server_id = Channel.find(params[:channel_id]).server.id
    if current_user.server_memberships.find(server_id)
      @message = Message.new(
        body: params[:body], 
        channel_id: params[:channel_id], 
        author_id: current_user.id
      )

      if @message.save
        ServersChannel.broadcast_to(@message.channel, @message)
        # ServersChannel.broadcast_to(@message.channel, from_template('api/messages/show', message: @message))
        render :show
      else
        render json: { errors: @message.errors }, status: :unprocessable_entity
      end
    else
      render json: { errors: { error: "Must be a server member to post this message"} }, status: :unauthorized
    end
  end

  def destroy 

  end

  def update
    
  end
end
