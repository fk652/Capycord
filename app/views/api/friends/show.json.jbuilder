json.friend do 
  friend = @friendship.user1

  json.friendshipId @friendship.id 
  json.userId friend.id
  json.extract! friend, :username, :custom_status, :profile_picture_url
  status = friend.online_status === "Offline" ? "Offline" : friend.set_online_status
  json.online_status status
end