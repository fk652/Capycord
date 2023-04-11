class MembersChannel < ApplicationCable::Channel
  def subscribed
    @member_channel = Server.find_by(id: params[:id])
    stream_for @member_channel
  end
end