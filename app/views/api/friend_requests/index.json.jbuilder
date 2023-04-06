json.friend_requests do
  json.sent do
    @sent_requests.each do |sent|
      json.set! sent.id do
        receiver = sent.receiver
        json.extract! sent, :id
        json.extract! receiver, :username, :profile_picture_url
      end
    end
  end
  
  json.received do
    @received_requests.each do |received|
      json.set! received.id do
        sender = received.sender
        json.extract! received, :id
        json.extract! sender, :username, :profile_picture_url
      end
    end
  end
end