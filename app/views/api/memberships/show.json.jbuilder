json.member do 
  member = membership.member

  json.extract! member, :id, :username, :custom_status, :profile_picture_url
  json.extract! membership, :position, :nickname
  status = (member.online_status == "Offline" || member.set_online_status == "Invisible") ? 
    "Offline" : member.set_online_status
  json.online_status status
end