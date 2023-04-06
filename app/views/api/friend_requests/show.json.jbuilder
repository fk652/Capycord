json.friend_request do
  json.set! @friend_request.id do
    json.extract @receiver, :username, :profile_picture_url
  end
end