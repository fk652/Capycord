json.friends do 
  @friends1.each do |friend|
    json.set! friend.id do
      json.extract! friend, :id, :username, :custom_status
      json.online_status friend.online_status === "Offline" 
                          ? "Offline" 
                          : friend.set_online_status
    end
  end

  @friends2.each do |friend|
    json.set! friend.id do
      json.extract! friend, :id, :username, :custom_status
      json.online_status friend.online_status === "Offline" 
                          ? "Offline" 
                          : friend.set_online_status
    end
  end
end