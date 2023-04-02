json.user do
  json.extract! @user, 
    :id, 
    :email, 
    :username, 
    :custom_status, 
    :online_status,
    :profile_picture_url,
    :created_at

end