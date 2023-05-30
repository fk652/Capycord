class Api::MembershipsController < ApplicationController
  before_action :require_logged_in
  before_action :verify_authorization
  
  def index 
    @memberships = current_user.server_memberships.find(params[:server_id]).memberships.includes(:member)
    if @memberships
      render :index
    else
      render json: {errors: @memberships.errors}, status: :unprocessable_entity
    end
  end

  def create
    membership = Membership.new({
      server_id: params[:server_id],
      member_id: current_user.id
    })

    if membership.save 
      @server = membership.server

      ServersChannel.broadcast_to(
        @server,
        type: 'ADD_MEMBER',
        **from_template('api/memberships/show', membership: membership)
      )

      render "api/servers/show", locals: {server: @server}
    else
      render json: {errors: membership.errors}, status: :unprocessable_entity
    end
  end

  def destroy 
    if @membership.destroy
      UsersChannel.broadcast_to(
        @membership.member,
        type: 'DELETE_SERVER',
        id: @membership.server.id
      )

      ServersChannel.broadcast_to(
        @membership.server,
        type: 'DELETE_MEMBER',
        id: @membership.member_id
      )

      render json: nil, status: :ok
    else
      render json: { errors: @membership.errors }, status: :unprocessable_entity
    end
  end

  private
  def verify_authorization
    @membership = Membership.includes(:server, :member).find(params[:id])

    # can update this later to also let admins kick/ban members
    if @membership.member_id != current_user.id
      render json: { errors: { error: "Not authorized to delete this membership"} }, status: :unauthorized
    end
  end
end
