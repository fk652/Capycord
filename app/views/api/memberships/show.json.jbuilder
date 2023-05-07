json.member do 
  member = membership.member

  json.extract! membership, :id, :position, :nickname, :member_id
  json.extract! member, :username, :custom_status, :profile_picture_url
  status = (member.online_status == "Offline" || member.set_online_status == "Invisible") ? 
    "Offline" : member.set_online_status
  json.online_status status
end