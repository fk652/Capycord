json.friend_request do
  json.requestId @friend_request.id
  json.userId @receiver.id
  json.extract! @receiver, :username, :profile_picture_url
end