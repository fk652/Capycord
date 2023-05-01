class Api::MembershipsController < ApplicationController
  before_action :require_logged_in
  
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
    membership = Membership.new({
      server_id: params[:server_id],
      member_id: current_user.id
    })

    if membership.save 
      @server = membership.server

      MembersChannel.broadcast_to(
        @server,
        type: 'UPDATE_MEMBER',
        **from_template('api/memberships/show', membership: membership)
      )

      render "api/servers/show"
    else
      render json: {errors: membership.errors}, status: :unprocessable_entity
    end
  end

  def destroy 

  end

  def update
    
  end
end
