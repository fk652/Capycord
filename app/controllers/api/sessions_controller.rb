class Api::SessionsController < ApplicationController
  before_action :require_logged_out, only: [:create]
  before_action :require_logged_in, only: [:destroy]

  def show
    if current_user
      @user = current_user
      render "api/users/show"
    else
      render json: { user: nil }
    end
  end

  def create
    @user = User.find_by_credentials(params[:email], params[:password])
    if @user 
      login!(@user)

      @user.memberships.includes(:server).each do |membership|
        MembersChannel.broadcast_to(
          membership.server,
          type: 'UPDATE_MEMBER',
          **from_template('api/memberships/show', membership: membership)
        )
      end

      @user.friendships1.includes(:user2).each do |friendship|
        FriendsChannel.broadcast_to(
          friendship.user2,
          type: 'UPDATE_FRIEND',
          **from_template('api/friends/show', friendship: friendship, friend: @user)
        )
      end

      @user.friendships2.includes(:user1).each do |friendship|
        FriendsChannel.broadcast_to(
          friendship.user1,
          type: 'UPDATE_FRIEND',
          **from_template('api/friends/show', friendship: friendship, friend: @user)
        )
      end

      @user.sent_friend_requests.includes(:receiver).each do |request|
        if request.status === "pending"
          FriendsChannel.broadcast_to(
            request.receiver,
            type: 'UPDATE_INCOMING_REQUEST',
            **from_template('api/friend_requests/show', friend_request: request, receiver: @user)
          )
        end
      end

      @user.received_friend_requests.includes(:sender).each do |request|
        if request.status === "pending"
          FriendsChannel.broadcast_to(
            request.sender,
            type: 'UPDATE_SENT_REQUEST',
            **from_template('api/friend_requests/show', friend_request: request, receiver: @user)
          )
        end
      end

      render "api/users/show"
    else
      render json: { errors: {login: ['Login or password is invalid.']} }, status: :unauthorized
    end
  end

  def destroy
    if current_user
      memberships = current_user.memberships.includes(:server)
      friendships1 = current_user.friendships1.includes(:user2, :user1)
      friendships2 = current_user.friendships2.includes(:user1, :user2)
      sent = current_user.sent_friend_requests.includes(:receiver, :sender)
      received = current_user.received_friend_requests.includes(:sender, :receiver)

      logout!()

      memberships.each do |membership|
        MembersChannel.broadcast_to(
          membership.server,
          type: 'UPDATE_MEMBER',
          **from_template('api/memberships/show', membership: membership)
        )
      end

      friendships1.each do |friendship|
        FriendsChannel.broadcast_to(
          friendship.user2,
          type: 'UPDATE_FRIEND',
          **from_template('api/friends/show', friendship: friendship, friend: friendship.user1)
        )
      end

      friendships2.each do |friendship|
        FriendsChannel.broadcast_to(
          friendship.user1,
          type: 'UPDATE_FRIEND',
          **from_template('api/friends/show', friendship: friendship, friend: friendship.user2)
        )
      end

      sent.each do |request|
        if request.status === "pending"
          FriendsChannel.broadcast_to(
            request.receiver,
            type: 'UPDATE_INCOMING_REQUEST',
            **from_template('api/friend_requests/show', friend_request: request, receiver: request.sender)
          )
        end
      end

      received.each do |request|
        if request.status === "pending"
          FriendsChannel.broadcast_to(
            request.sender,
            type: 'UPDATE_SENT_REQUEST',
            **from_template('api/friend_requests/show', friend_request: request, receiver: request.receiver)
          )
        end
      end

      head :no_content
    end
  end
end
