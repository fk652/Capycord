json.servers do 
  @servers.each do |server|
    json.set! server.id do
      json.extract! server, :id, :name, :picture_url
    end
  end
end