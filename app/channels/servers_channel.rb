class ServersChannel < ApplicationCable::Channel
  def subscribed
    @server_channel = Channel.find_by(id: params[:id])
    stream_for @server_channel
  end
end