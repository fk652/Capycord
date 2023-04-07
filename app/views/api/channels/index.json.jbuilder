json.channels do
  @channels.each do |channel|
    json.set! channel.id do
      json.extract! channel, :id, :name, :channel_type
    end
  end
end