ApplicationRecord.transaction do 
  puts "Destroying tables..."
  Membership.destroy_all
  Server.destroy_all  # should dependent destroy channels, messages, server_invites
  Friend.destroy_all
  User.destroy_all    # should dependent destroy friend requests

  puts "Resetting primary keys..."
  ApplicationRecord.connection.reset_pk_sequence!('users')
  ApplicationRecord.connection.reset_pk_sequence!('servers')
  ApplicationRecord.connection.reset_pk_sequence!('channels')
  ApplicationRecord.connection.reset_pk_sequence!('messages')
  ApplicationRecord.connection.reset_pk_sequence!('memberships')
  ApplicationRecord.connection.reset_pk_sequence!('server_invites')
  ApplicationRecord.connection.reset_pk_sequence!('friends')
  ApplicationRecord.connection.reset_pk_sequence!('friend_requests')
  
  puts "Creating users..."
  users = []
  demo_1 = User.create!(
    username: 'Capybaby', 
    email: 'capybara@gmail.com', 
    password: 'password123',
    custom_status: 'CAPYBARA CAPYBARA CAPYBARA 🦫',
    profile_picture_url: 'https://images.fineartamerica.com/images-medium-large-5/baby-capybara-m-watson.jpg'
  )
  users << demo_1

  demo_2 = User.create!(
    username: 'SSJ Capy', 
    email: 'capybara2@gmail.com', 
    password: 'password123',
    custom_status: 'CAPYBARA OVER 9000 💢',
    profile_picture_url: 'https://cdn.drawception.com/images/panels/2017/5-4/wR4kkj9B1j-2.png',
    set_online_status: 'Idle'
  )
  users << demo_2
  
  10.times do 
    users << User.create!({
      username: Faker::Internet.unique.username(specifier: 3),
      email: Faker::Internet.unique.email,
      password: 'password',
      online_status: User::STATUS[0..1].sample(),
      set_online_status: User::STATUS[1..-1].sample(),
      custom_status: [Faker::Quote.unique.famous_last_words, ''].sample(),
      profile_picture_url: 'https://www.rainforest-alliance.org/wp-content/uploads/2021/06/capybara-square-1.jpg.optimal.jpg'
    }) 
  end

  # users.each { |user| p user }

  puts "Creating servers..."
  servers = []
  users.each do |user|
    servers << Server.create!({
      name: Faker::Games::Pokemon.unique.location,
      owner_id: user.id,
      # picture_url: "https://www.travelandleisure.com/thmb/R2kb6GuJwF4wVJhRVevV-FqOVao=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/el-yunque-national-rainforest-tropical-puerto-rico-TROPICALPLANTS0617-d3ccb18a16064e42bdd626cdf7a8cb68.jpg"
      picture_url: Faker::LoremFlickr.image
    })
  end

  puts "Creating channels..."
  channels = []
  servers.each do |server|
    rand(3..5).times do
      channels << Channel.create!({
        name: Faker::JapaneseMedia::OnePiece.unique.island,
        server_id: server.id
      })
    end
  end

  # users.each { |user| p user }
  # p User.all

  puts "Creating server memberships..."
  memberships = {}
  servers.each do |server|
    users_copy = User.where.not(id: server.owner.id).to_a
    memberships[server.id] = [];

    rand(5..users_copy.length).times do 
      rand_user = users_copy.delete_at(rand(users_copy.length))
      memberships[server.id] << Membership.create!({
        member_id: rand_user.id,
        server_id: server.id,
        nickname: [Faker::JapaneseMedia::Naruto.unique.character, nil].sample()
      })
    end
  end

  puts "Creating messages..."
  messages = []
  channels.each do |channel|
    rand(10..20).times do
      user_id = channel.server.members.sample().id
      messages << Message.create!({
        body: [
          Faker::Quote.famous_last_words,
          Faker::Quote.jack_handey,
          Faker::Quote.matz,
          Faker::Quote.most_interesting_man_in_the_world,
          Faker::Quote.robin,
          Faker::Quote.singular_siegler,
          Faker::Quote.yoda
        ].sample(),
        author_id: user_id,
        channel_id: channel.id,
        status: Message::STATUS.sample()
      })
    end
  end

  puts "Creating server invites..."
  # to do later
  # should only be invites to and from demo users

  puts "Creating friendships..."
  friendships = []
  [demo_1.id, demo_2.id].each do |demo_id|
    users_copy = User.where.not(id: [demo_1.id, demo_2.id]).to_a

    rand(2..5).times do 
      rand_user = users_copy.delete_at(rand(users_copy.length))
      friendships << Friend.create!({
        user1_id: demo_id,
        user2_id: rand_user.id
      })
    end
  end

  puts "Creating friend requests..."
  # replace with friend requests to and from other non-demo users
  FriendRequest.create!({
    sender_id: demo_1.id,
    receiver_id: demo_2.id
  })

  puts "Done seeding."
end