json.friend do 
  # friend = (type === 1 ? friendship.user1 : friendship.user2)

  json.friendshipId friendship.id 
  json.userId friend.id
  json.extract! friend, :username, :custom_status, :profile_picture_url
  status = (friend.online_status == "Offline" || friend.set_online_status == "Invisible") ? 
    "Offline" : friend.set_online_status
  json.online_status status
end