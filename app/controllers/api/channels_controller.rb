class Api::ChannelsController < ApplicationController
  before_action :require_logged_in
  before_action :verify_admin, only: [:create, :destroy, :update]
  
  def index
    @channels = current_user.server_memberships.find(params[:server_id]).channels
    if @channels
      render :index
    else
      render json: {errors: @channels.errors}, status: :unprocessable_entity
    end
  end

  def create
    # to do
  end

  def destroy 
    # to do
  end

  def update
    # to do
  end

  private
  def verify_admin
    # verify current user is owner or admin in memberships
  end
end
