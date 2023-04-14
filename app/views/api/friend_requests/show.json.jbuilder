json.friend_request do
  json.requestId friend_request.id
  json.userId receiver.id
  json.extract! receiver, :username, :profile_picture_url

  status = (receiver.online_status == "Offline" || receiver.set_online_status == "Invisible") ? 
    "Offline" : receiver.set_online_status
  json.online_status status
end