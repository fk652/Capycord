json.members do 
  @members.each do |member|
    json.set! member.id do
      json.extract! member, :id, :username, :custom_status, :profile_picture_url
      status = member.online_status === "Offline" ? "Offline" : member.set_online_status
      json.online_status status
    end
  end
end