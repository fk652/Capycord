json.friends do 
  @friends1.each do |friend|
    json.set! friend.id do
      status = friend.online_status === "Offline" ? "Offline" : friend.set_online_status

      json.extract! friend, :id, :username, :custom_status, :profile_picture_url
      json.online_status status
    end
  end

  @friends2.each do |friend|
    json.set! friend.id do
      status = friend.online_status === "Offline" ? "Offline" : friend.set_online_status

      json.extract! friend, :id, :username, :custom_status, :profile_picture_url
      json.online_status status
    end
  end
end