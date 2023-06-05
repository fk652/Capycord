json.servers do 
  @servers.each do |server|
    json.set! server.id do
      json.extract! server, :id, :name, :picture_url, :owner_id, :invite_link, :first_channel_id
    end
  end
end