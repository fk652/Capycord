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
  
  profile_image_urls = [
    "https://helios-i.mashable.com/imagery/articles/04PFXb77qnqe9oIRkpD9wkL/hero-image.fill.size_1200x1200.v1611611762.jpg",
    "https://i1.sndcdn.com/avatars-DcpRNTjsnQ2RUU3J-b22Z2g-t500x500.jpg",
    "https://storage.googleapis.com/ares-profile-pictures/hd/capybara.man-fa872b7af51b73a11b47cdf18270870f_hd.jpg",
    "https://www.rainforest-alliance.org/wp-content/uploads/2021/06/capybara-square-1.jpg.optimal.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/8/8e/Yellow-headed_caracara_%28Milvago_chimachima%29_on_capybara_%28Hydrochoeris_hydrochaeris%29.JPG",
    "https://i.pinimg.com/736x/ad/cb/93/adcb93adc6397fa2a9229840b89c66d5.jpg",
    "https://www.artmajeur.com/medias/standard/j/p/jp-eugster/artwork/16391596_kingsize-capybara-3.jpg?v=1671743784",
    "https://preview.redd.it/some-pictures-of-capybaras-in-outfits-v0-97zf3be4cwea1.jpg?width=640&crop=smart&auto=webp&s=da507651bcbc7b9dff98d4f2013e6a4452dc5925",
    "https://i.etsystatic.com/15332298/r/il/da85ac/1935059239/il_fullxfull.1935059239_l0ky.jpg",
    "https://i.pinimg.com/originals/1b/bc/9c/1bbc9c249cfcf9bf40a49ae1575da3fb.jpg"
  ]

  server_icon_urls = [
    "https://travel.mqcdn.com/mapquest/travel/wp-content/uploads/2020/06/GettyImages-676934538-e1592461667985.jpg",
    "https://cdn.britannica.com/90/3890-050-F451C580/rainforest-coast-lowland-rainforests-Ecuador-tropics-evergreen.jpg",
    "https://images.nationalgeographic.org/image/upload/v1638890143/EducationHub/photos/rio-canande-reserve.jpg",
    "https://whc.unesco.org/uploads/thumbs/site_0368_0001-1200-630-20071205110908.jpg",
    "https://image.cnbcfm.com/api/v1/image/106141346-1568999771274rts2q2vz.jpg?v=1568999827&w=1920&h=1080",
    "https://blog.candywarehouse.com/wp-content/uploads/2019/05/rainforests-sources-of-chocolate-gum-and-more.jpg",
    "https://www.conserve-energy-future.com/wp-content/uploads/2017/10/amazon-rainforest-forest.jpg",
    "https://www.wilderness.org/sites/default/files/styles/1000x755/public/media/image/WA_Olympic_NP_MarcAdamus_R_130621_02-X3.jpg?h=f8d20cf0&itok=8ZpYcKr-",
    "https://www.mobot.org/hort/images/Clim1-1.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/8/87/Chiapas_Rainforest_crop.jpg",
    "https://www.islandexpeditions.com/sites/default/files/2018-10/BW%20Bocawina-3.jpg",
    "https://share.america.gov/wp-content/uploads/2022/03/rainforest-USA-2G8GDBF.jpg",
    "https://media0.giphy.com/media/hi2kPofVMW70k/giphy.gif"
  ]

  puts "Creating users..."
  users = []
  demo_1 = User.create!(
    username: 'Capybaby', 
    email: 'capybara@gmail.com', 
    password: 'password123',
    custom_status: 'CAPYBARA CAPYBARA CAPYBARA 🦫',
    profile_picture_url: 'https://i.pinimg.com/564x/66/6e/ec/666eecdd082565ca44425c681113ee0f.jpg'
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
  
  (0..9).each do |i| 
    users << User.create!({
      username: Faker::Internet.unique.username(specifier: 3),
      email: Faker::Internet.unique.email,
      password: 'password',
      online_status: User::STATUS[0..1].sample(),
      set_online_status: User::STATUS[1..-1].sample(),
      custom_status: [Faker::Quote.unique.famous_last_words, ''].sample(),
      profile_picture_url: profile_image_urls[i]
    }) 
  end

  puts "Creating servers..."
  servers = []
  users.each_with_index do |user, i|
    servers << Server.create!({
      name: Faker::Games::Pokemon.unique.location,
      owner_id: user.id,
      picture_url: server_icon_urls[i]
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
  demo_users = users[2..-1]
  friendships = []

  demo_users[0...demo_users.length/2].each do |demo_capy|
    user1, user2 = [demo_1, demo_capy].shuffle();
    friendships << Friend.create!({
      user1_id: user1.id,
      user2_id: user2.id
    })
  end

  demo_users[(demo_users.length/2)..-1].each do |demo_capy|
    user1, user2 = [demo_2, demo_capy].shuffle();
    friendships << Friend.create!({
      user1_id: user1.id,
      user2_id: user2.id
    })
  end

  puts "Creating friend requests..."
  # replace with friend requests to and from other non-demo users
  FriendRequest.create!({
    sender_id: demo_1.id,
    receiver_id: demo_2.id
  })

  puts "Done seeding."
end