json.message do
  json.extract! message, :id, :body, :author_id, :status, :created_at, :updated_at
end

# json.message do
#   json.partial! 'api/messages/message', message: message
# end