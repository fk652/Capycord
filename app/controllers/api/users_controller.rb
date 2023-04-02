class Api::UsersController < ApplicationController
  before_action :require_logged_out, only: [:create]

  wrap_parameters include: User.attribute_names + ['password']

  def create
    @user = User.new(create_params)
    if @user.save
      login!(@user)
      render :show
    else 
      render json: { errors: @user.errors }, status: :unprocessable_entity
    end
  end

  private
  def create_params
    params.require(:user).permit(:username, :email, :password)
  end
end
