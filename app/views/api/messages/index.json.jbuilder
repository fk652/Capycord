json.messages do
  @messages.each do |message|
    json.set! message.id do
      json.extract! message, :id, :body, :author_id, :status, :created_at, :updated_at
    end
  end
end