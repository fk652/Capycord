class Api::MessagesController < ApplicationController
  before_action :require_logged_in
  
  def index
    @messages = current_user.channel_memberships.find(params[:channel_id]).messages
    if @messages
      render :index
    else
      render json: {errors: @messages.errors}, status: :unprocessable_entity
    end

    # channel = Channel.find(params[:channel_id])
    # if channel
    #   server = channel.server
    #   if current_user.server_memberships.find(server.id)
    #     @messages = channel.messages
    #     render :index
    #   else
    #     render json: { errors: { error: "Must be a server member to view this information"} }, status: :unauthorized
    #   end
    # else
    #   render json: { errors: { error: "Channel not found"} }, status: :unprocessable_entity
    # end
  end

  def show

  end

  def create
    @message = Message.new(
      body: params[:body], 
      channel_id: params[:channel_id], 
      author_id: current_user.id
    )

    if @message.save
      ServersChannel.broadcast_to(
        @message.channel,
        type: 'RECEIVE_MESSAGE',
        **from_template('api/messages/show', message: @message)
      )
      
      render json: nil, status: :ok
    else
      render json: { errors: @message.errors }, status: :unprocessable_entity
    end

    # server_id = Channel.find(params[:channel_id]).server.id
    # if current_user.server_memberships.find(server_id)
    #   @message = Message.new(
    #     body: params[:body], 
    #     channel_id: params[:channel_id], 
    #     author_id: current_user.id
    #   )

    #   if @message.save
    #     # ServersChannel.broadcast_to(@message.channel, @message)
    #     ServersChannel.broadcast_to(
    #       @message.channel,
    #       type: 'RECEIVE_MESSAGE',
    #       **from_template('api/messages/show', message: @message)
    #     )
        
    #     # render :show
    #     # render :show, locals: {message: @message}
    #     render json: nil, status: :ok
    #   else
    #     render json: { errors: @message.errors }, status: :unprocessable_entity
    #   end
    # else
    #   render json: { errors: { error: "Must be a server member to post this message"} }, status: :unauthorized
    # end
  end

  def destroy 
    @message = Message.find(params[:id])
    if @message.author_id === current_user.id 
      if @message.destroy
        ServersChannel.broadcast_to(
          @message.channel,
          type: 'DESTROY_MESSAGE',
          id: @message.id
        )

        # head :no_content
        render json: nil, status: :ok
      else
        render json: { errors: @message.errors }, status: :unprocessable_entity
      end
    else
      render json: { errors: { error: "Must be a server member to post this message"} }, status: :unauthorized
    end
  end

  def update
    
  end
end
