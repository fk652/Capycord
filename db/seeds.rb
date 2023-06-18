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
  ApplicationRecord.connection.reset_pk_sequence!('friends')
  ApplicationRecord.connection.reset_pk_sequence!('friend_requests')

  puts "Creating users..."
  users = []

  # demo users
  demo_1 = User.create!(
    username: 'SSJ Capy', 
    email: 'capybara@gmail.com', 
    password: 'password123',
    custom_status: 'CAPYBARA OVER 9000 💢',
    profile_picture_url: 'https://cdn.drawception.com/images/panels/2017/5-4/wR4kkj9B1j-2.png',
    set_online_status: 'Idle',
    created_at: rand(10.0..20.0).days.ago
  )
  users << demo_1
  
  demo_2 = User.create!(
    username: 'Capybaby', 
    email: 'capybara2@gmail.com', 
    password: 'password123',
    custom_status: 'CAPYBARA CAPYBARA CAPYBARA 🦫',
    profile_picture_url: 'https://i.pinimg.com/564x/66/6e/ec/666eecdd082565ca44425c681113ee0f.jpg',
    created_at: rand(10.0..20.0).days.ago
  )
  users << demo_2

  # demo user 1 friends
  seed_users_1 = [
    { 
      username: "Uncle Wombat",
      profile_picture_url: "https://helios-i.mashable.com/imagery/articles/04PFXb77qnqe9oIRkpD9wkL/hero-image.fill.size_1200x1200.v1611611762.jpg",
      custom_status: "Let's be friends"
    },
    {
      profile_picture_url: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjNjMTM2ODc3ZmI3NDVmMDJkODhlNDE3ZGJiYzRjZjU0ZTNiMWYzNyZjdD1n/l4Ki01RIvdIQVFhqE/giphy.gif",
      username: "CapyChatty",
      custom_status: "Why doesn't anyone ever listen to me?"
    },
    {
      profile_picture_url: "https://i1.sndcdn.com/avatars-DcpRNTjsnQ2RUU3J-b22Z2g-t500x500.jpg",
      username: "CapyChillin",
      custom_status: ""
    },
    {
      profile_picture_url: "https://media0.giphy.com/media/rxzyeEkp0oQ47QQCKk/giphy.gif",
      username: "CapySUS",
      custom_status: "ඞ"
    },
    {
      profile_picture_url: "https://storage.googleapis.com/ares-profile-pictures/hd/capybara.man-fa872b7af51b73a11b47cdf18270870f_hd.jpg",
      username: "Capycito",
      custom_status: ""
    },
    {
      profile_picture_url: "https://i.pinimg.com/originals/a1/0e/71/a10e71e4e4245d2952ad40850d0124b3.gif",
      username: "CapyStareintoyoursoul",
      custom_status: "👁️"
    },
    {
      profile_picture_url: "https://www.rainforest-alliance.org/wp-content/uploads/2021/06/capybara-square-1.jpg.optimal.jpg",
      username: "CapyGucci",
      custom_status: ""
    },
    {
      profile_picture_url: "https://media0.giphy.com/media/RKLvNCafB1Zkf5JfZW/giphy.gif",
      username: "Capy-chan OwO",
      custom_status: "(✿◕‿◕✿)"
    },
    {
      profile_picture_url: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Yellow-headed_caracara_%28Milvago_chimachima%29_on_capybara_%28Hydrochoeris_hydrochaeris%29.JPG",
      username: "CapyChad",
      custom_status: "life is an adventure that is best lived boldly."
    },
    {
      profile_picture_url: "https://media.tenor.com/TsqORryufiUAAAAM/chilling-annoyed.gif",
      username: "CapyBirb",
      custom_status: ""
    },
    {
      profile_picture_url: "https://i.pinimg.com/736x/ad/cb/93/adcb93adc6397fa2a9229840b89c66d5.jpg",
      username: "CapyHappy",
      custom_status: "🤤"
    },
    {
      profile_picture_url: "https://media0.giphy.com/media/hi2kPofVMW70k/giphy.gif",
      username: "Capy NOM NOM NOM",
      custom_status: "NOM NOM NOM NOM NOM NOM NOM NOM NOM"
    },
    {
      profile_picture_url: "https://www.artmajeur.com/medias/standard/j/p/jp-eugster/artwork/16391596_kingsize-capybara-3.jpg",
      username: "King Capy IV, Lord of Rails",
      custom_status: "Long live the king"
    },
    {
      profile_picture_url: "https://i.etsystatic.com/15332298/r/il/da85ac/1935059239/il_fullxfull.1935059239_l0ky.jpg",
      username: "Alfred Fitzgerald",
      custom_status: "A gentleman is simply a patient capybara."
    }
  ]

  online_statuses = []
  4.times {online_statuses << "Online"}
  7.times {online_statuses << "Invisible"}
  2.times {online_statuses << "Idle"}
  1.times {online_statuses << "Do Not Disturb"}

  seed_users_1.each do |seed_user|
    seed_user[:email] = Faker::Internet.unique.email
    seed_user[:password] = 'password'
    seed_user[:online_status] = 'Online'
    seed_user[:set_online_status] = online_statuses.delete_at(rand(online_statuses.length))
    seed_user[:created_at] = rand(10.0..20.0).days.ago

    users << User.create!(seed_user) 
  end

  # demo user 2 friends
  seed_users_2 = [
    {
      profile_picture_url: "https://i.pinimg.com/originals/1b/bc/9c/1bbc9c249cfcf9bf40a49ae1575da3fb.jpg",
      username: "CapySean",
      custom_status: "bruh 🦫",
      set_online_status: "Do Not Disturb"
    },
    {
      profile_picture_url: "https://64.media.tumblr.com/58d224fd237c3c4d87c52d519c24185e/tumblr_npmr6xJ8yW1u6hbi4o1_250.jpg",
      username: "CapyKhan",
      custom_status: "The capybara below me is cheating on their lover with a gopher",
      set_online_status: "Invisible"
    },
    {
      profile_picture_url: "https://metro.co.uk/wp-content/uploads/2015/08/marmot.png",
      username: "GopherGary",
      custom_status: "I'm that gopher",
      set_online_status: "Do Not Disturb"
    },
    {
      profile_picture_url: "https://i.pinimg.com/originals/96/57/4c/96574ccd432266b9115b6da825ac20e1.jpg",
      username: "Capycita",
      custom_status: "In a happy relationship with CapySean 💖. Buying flowers on Amazon later"
    }
  ]

  seed_users_2.each do |seed_user|
    seed_user[:email] = Faker::Internet.unique.email
    seed_user[:password] = 'password'
    seed_user[:created_at] = rand(10.0..20.0).days.ago
    seed_user[:online_status] = "Online"

    users << User.create!(seed_user)
  end

  puts "Creating servers..."
  server_icon_urls = [
    "https://travel.mqcdn.com/mapquest/travel/wp-content/uploads/2020/06/GettyImages-676934538-e1592461667985.jpg",
    "https://cdn.britannica.com/90/3890-050-F451C580/rainforest-coast-lowland-rainforests-Ecuador-tropics-evergreen.jpg",
    "https://images.nationalgeographic.org/image/upload/v1638890143/EducationHub/photos/rio-canande-reserve.jpg",
    "https://whc.unesco.org/uploads/thumbs/site_0368_0001-1200-630-20071205110908.jpg",
    "https://image.cnbcfm.com/api/v1/image/106141346-1568999771274rts2q2vz.jpg",
    "https://blog.candywarehouse.com/wp-content/uploads/2019/05/rainforests-sources-of-chocolate-gum-and-more.jpg",
    "https://www.conserve-energy-future.com/wp-content/uploads/2017/10/amazon-rainforest-forest.jpg",
    "https://www.wilderness.org/sites/default/files/styles/1000x755/public/media/image/WA_Olympic_NP_MarcAdamus_R_130621_02-X3.jpg",
    "https://www.mobot.org/hort/images/Clim1-1.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/8/87/Chiapas_Rainforest_crop.jpg",
    "https://www.islandexpeditions.com/sites/default/files/2018-10/BW%20Bocawina-3.jpg",
    "https://share.america.gov/wp-content/uploads/2022/03/rainforest-USA-2G8GDBF.jpg",
  ]

  servers = []
  users.each_with_index do |user, i|
    servers << Server.create!({
      name: Faker::Games::Pokemon.unique.location,
      owner_id: user.id,
      picture_url: server_icon_urls[i],
      created_at: rand(10.0..15.0).days.ago
    })
  end

  puts "Creating channels..."
  channels = []
  servers.each do |server|
    rand(3..5).times do
      channels << Channel.create!({
        name: Faker::JapaneseMedia::OnePiece.unique.island,
        server_id: server.id,
        created_at: rand(5.0...10.0).days.ago
      })
    end
  end

  puts "Creating server memberships..."
  memberships = {}
  servers.each do |server|
    memberships[server.id] = []
  end

  # demo user memberships
  servers[0..(8 * servers.length / 10)].each_with_index do |server, idx|
    if server.owner == demo_2 || (idx.even? && server.owner != demo_1)
      memberships[server.id] << Membership.create!({
        member_id: demo_1.id,
        server_id: server.id,
        nickname: [Faker::JapaneseMedia::Naruto.character, nil].sample()
      })
    end
  end

  servers[0..servers.length/2].each_with_index do |server, idx|
    if server.owner == demo_1 || (idx.odd? && server.owner != demo_2)
      memberships[server.id] << Membership.create!({
        member_id: demo_2.id,
        server_id: server.id,
        nickname: [Faker::JapaneseMedia::Naruto.character, nil].sample()
      })
    end
  end

  # seed user memberships
  servers.each_with_index do |server, idx|
    seed_users = User.where.not(id: [demo_1.id, demo_2.id, server.owner.id]).to_a

    rand(5..seed_users.length).times do 
      rand_user = seed_users.delete_at(rand(seed_users.length))

      memberships[server.id] << Membership.create!({
        member_id: rand_user.id,
        server_id: server.id,
        nickname: [Faker::JapaneseMedia::Naruto.character, nil].sample()
      })
    end
  end

  puts "Creating messages..."
  messages = []

  messages << Message.create!({
    body: 
    "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣸⣝⣧⣀⣠⡶⢿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⢀⣀⣠⠤⠤⠖⠚⠛⠉⢙⠁⠈⢈⠟⢽⢿⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⣴⠋⣍⣠⡄⠀⠀⠀⠶⠶⣿⡷⡆⠘⠀⠈⠀⠉⠻⢦⣀⠀⠀⠀⠀⠀⠀⠀⣀⣀⣀⣀⣤⣤⠦⠦⠦⠤⠤⢤⣤⣤⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⢰⠇⠀⢸⠋⠀⠀⠀⠀⠀⠀⠈⠁⠀⠀⠀⠀⠀⠀⠀⠀⠙⠓⠲⠤⠴⠖⠒⠛⠉⠉⢉⡀⠀⠀⠙⢧⡤⡄⠀⢲⡖⠀⠈⠉⠛⠲⢦⣀⠀⠀⠀⠀⠀⠀
⢸⠀⠀⢸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⠉⠡⠤⠀⠀⠰⠾⠧⠀⠀⠿⠦⠉⠉⠀⠶⢭⡉⠃⠀⣉⠳⣤⡀⠀⠀⠀
⠸⣆⢠⡾⢦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡘⠇⢠⣄⠀⠦⣌⠛⠂⠻⣆⠀⠀
⠀⠹⣦⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣇⠀⢠⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠁⠀⠈⣹⠀⠀⡀⠐⣄⠙⣧⡀
⠀⠀⠀⠉⠙⠒⠒⠒⠒⠒⠶⣦⣀⡽⠆⠀⢳⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢲⠀⠙⠦⠈⠀⢹⡇
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⣞⢧⠐⢷⠀⢰⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢦⡀⠈⢳⠀⣿
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢯⢇⡀⠃⠈⢳⠀⢳⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠃⠀⡈⠀⣻
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢳⡝⠶⢦⡀⣆⠀⠛⠀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⠇⢀⡟
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢦⡠⣄⠙⠀⠸⠄⢻⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⡤⠀⠀⠀⠀⠀⠀⠀⠀⣠⠆⠀⡼⠃
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢳⣌⠠⣄⠰⡆⢸⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⠏⣾⡽⡀⠀⠀⠀⠀⢠⡴⠊⠉⢠⡾⠁⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣄⡈⡀⠀⣾⣥⣤⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡏⣠⠈⢡⡇⠀⠀⡀⠀⠘⠞⣠⡴⠋⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠨⣧⠃⠑⠀⣷⡏⠉⠈⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⢳⠿⢢⡈⣇⠀⢸⣿⣧⣦⠾⣿⠉⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠦⠰⢾⢻⡇⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢧⠈⠣⠸⠄⣴⢿⠋⠁⠀⠻⣦⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⡀⡆⠸⢸⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢳⡆⢀⣀⡈⢫⣷⠀⢀⣴⠟⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣠⡤⠞⠉⠃⢠⣧⡾⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣾⣧⠎⠉⡽⢋⠏⠀⣼⠏⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣽⡿⣭⣿⣏⡴⠞⠋⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⡴⣶⡞⠋⢩⣏⣴⠯⠴⠋⠀⣰⠋⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⠻⠿⠿⣺⡧⠶⠚⠉⠙⠓⠒⠒⠚⠁⠀⠀⠀⠀⠀⠀⠀",
    author_id: User.first.id,
    channel_id: Server.first.channels.first.id,
    status: Message::STATUS.sample()
  })

  messages << Message.create!({
    body: 
    "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⣬⠷⣶⡖⠲⡄⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⣠⠶⠋⠁⠀⠸⣿⡀⠀⡁⠈⠙⠢⠤⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⢠⠞⠁⠀⠀⠀⠀⠀⠉⠣⠬⢧⠀⠀⠀⠀⠈⠻⣤⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⢀⡴⠃⠀⠀⢠⣴⣿⡿⠀⠀⠀⠐⠋⠀⠀⠀⠀⠀⠀⠘⠿⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⢀⡴⠋⠀⠀⠀⠀⠈⠉⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠒⠒⠓⠛⠓⠶⠶⢄⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⢠⠎⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠦⣀⠀⠀⠀⠀⠀⠀⠀⠀
⡞⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⢷⡄⠀⠀⠀⠀⠀⠀
⢻⣇⣹⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢦⡀⠀⠀⠀⠀
⠀⠻⣟⠋⠀⠀⠀⠀⠀⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠻⣄⠀⠀⠀
⠀⠀⠀⠉⠓⠒⠊⠉⠉⢸⡙⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⠀⠀⠀⠘⣆⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣱⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣿⠀⠀⠀⠀⠀⢻⡄⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠟⣧⡀⠀⠀⢀⡄⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡿⠇⠀⠀⠀⠀⠀⠀⢣⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⡧⢿⡀⠚⠿⢻⡆⠀⠀⠀⠀⠀⢠⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⡇⠀⠀⠀⠀⠀⠀⠀⠘⡆
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⠀⠀⠈⢹⡀⠀⠀⠀⠀⣾⡆⠀⠀⠀⠀⠀⠀⠀⠀⠾⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⡇
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠨⢷⣾⠀⠸⡷⠀⠀⠀⠘⡿⠂⠀⠀⠀⢀⡴⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⡇
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡄⠳⢼⣧⡀⠀⠀⢶⡼⠦⠀⠀⠀⡞⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠃
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡇⠀⡎⣽⠿⣦⣽⣷⠿⠒⠀⠀⠀⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⠁⣴⠃⡿⠀⠀⢠⠆⠢⡀⠀⠀⠀⠈⢧⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⠇⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣠⣠⠏⠀⣸⢰⡇⠀⢠⠏⠀⠀⠘⢦⣀⣀⠀⢀⠙⢧⡀⠀⠀⠀⠀⠀⠀⠀⠀⡰⠁⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠾⠿⢯⣤⣆⣤⣯⠼⠀⠀⢸⠀⠀⠀⠀⠀⣉⠭⠿⠛⠛⠚⠟⡇⠀⠀⣀⠀⢀⡤⠊⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠀⢸⣷⣶⣤⣦⡼⠀⠀⠀⣴⣯⠇⡀⣀⣀⠤⠤⠖⠁⠐⠚⠛⠉⠁⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣛⠁⢋⡀⠀⠀⠀⠀⣛⣛⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
    author_id: User.first.id,
    channel_id: Server.second.channels.first.id,
    status: Message::STATUS.sample()
  })

  messages << Message.create!({
    body: 
    "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣶⠛⢻⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣤⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⣄⣼⡦⠴⠒⠒⠶⣤⣀⠀⣾⢧⡋⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⣀⡤⠶⠚⠉⠁⠀⠀⠀⠀⠀⠀⠀⠈⣿⣷⣋⡿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⢀⡤⠖⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣶⣶⣦⠈⠻⠻⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⢀⡠⠞⠃⠀⠀⠀⠀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⣿⣿⡇⠀⡀⠙⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⡞⠁⠀⠀⠀⠀⢀⡴⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠛⠛⠟⠀⠀⠙⠀⠸⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⡿⣤⡀⠀⢀⡴⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡀⠀⠀⠀⠀⠘⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⡇⠀⠉⠉⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⠀⠀⠀⠀⠀⠳⣄⠀⠀⡀⠀⠈⢳⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⢹⡀⠀⢸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢈⣷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠙⢦⡀⠀⠙⢦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠘⣇⠀⠘⣆⠀⠀⠀⠀⠀⠀⠀⢀⣴⠞⠀⠹⠆⠀⠀⠈⢳⠀⠀⠀⠀⠀⠁⠀⠀⠀⠉⠳⠤⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠘⢦⣤⣹⣄⣀⣀⣀⣠⣤⠴⠊⠀⠀⠀⠀⠀⠀⠀⠀⠈⠃⠀⠀⠀⠀⠲⣤⡀⠀⠀⠀⠀⠈⠙⠲⢤⡀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠙⠲⢤⡀⠀⠀⠀⠀⠀⠀⢀⠀⠀⠀⠀⠀⠀⢰⡄⠀⠀⠀⠀⠁⠀⠀⠀⠀⠈⠑⠢⣄⡙⠷⣄⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠈⡇⠀⠀⡀⠀⠀⠀⢸⡇⠀⠀⠀⠀⠀⢸⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠈⠀⠀⠈⠳⣄⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣻⠀⠀⢳⠀⠀⠀⠘⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠢⡀⠀⠑⢄⠙⢆⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡇⠀⠈⠂⠀⠀⠀⠀⢠⣿⠀⠀⠀⠀⠀⠀⢀⣤⠴⠚⠃⠀⠀⠘⢢⡀⠀⠀⠉⠀⠀⠈⠧⠘⢧⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢈⡇⠀⠀⠀⠀⠀⠀⠀⠘⠋⠀⠀⠀⠀⠀⣴⠋⠀⠀⠀⠀⠀⠀⠀⠀⠙⢦⡀⠀⢦⠀⠀⠀⠀⠈⣇⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢹⠀⢰⢀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣴⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠁⠀⠈⢳⡀⠀⠀⠀⠸⡆
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠀⠘⠷⠀⠀⠀⠀⠀⢠⠀⠀⠀⠠⡏⠀⠀⢠⠀⠀⠀⠀⠀⢠⡀⠀⠀⠀⡀⠀⠀⠷⠀⢸⡄⠀⢳
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⡇⠀⠀⠀⠀⡄⠀⠀⢸⡇⠀⠀⢸⣧⠀⠀⠈⢣⠀⠀⠀⠀⢀⣳⠀⠀⠀⢹⡄⠀⠀⠀⠈⠁⠀⢸
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠻⡄⠀⠀⠀⣷⠀⠀⠘⠃⠀⠀⢀⣿⡀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠁⠀⠀⠸⢳⡀⢀⡀⠀⢠⠀⢸
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⣄⠀⠀⢻⡇⠀⠀⠀⠀⠀⣸⠉⢧⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⠀⠐⣧⠀⠸⠀⡼
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣿⣦⡀⣸⣷⠀⠀⠀⠀⠀⡇⠀⠈⠳⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⠀⢸⠇
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣴⣖⡿⣿⡟⣻⣿⣷⡄⠀⠀⢾⣁⡀⠀⠀⣨⡷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⠏⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠿⠷⠿⣿⣥⠟⠀⣹⣾⠦⡿⡾⠇⠉⢻⣟⣀⣀⡬⠟⠲⢤⣀⣀⣀⣀⠀⠀⠀⠀⢀⣀⡴⠋⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠋⠁⢰⣿⡽⢛⡧⢠⡇⠀⠀⠀⠉⠉⠙⠓⠒⠒⠚⠉⠁⠀⠉⠑⠒⠒⠉⠉⠁⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⠛⠒⣿⣤⠞⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
    author_id: User.second.id,
    channel_id: Server.second.channels.first.id,
    status: Message::STATUS.sample()
  })

  rand_messages = [];
  prev_user = nil;
  prev_time = nil;
  channels.each do |channel|
    rand(10..20).times do
      user_id = channel.server.members.sample().id
      rand_time = user_id == prev_user ? prev_time : rand(2.0...5.0).days.ago

      rand_messages << {
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
        status: Message::STATUS.sample(),
        created_at: rand_time,
        updated_at: rand(1..20) == 15 ? rand(0.1...2.0).days.ago : rand_time
      }

      prev_user = user_id
      prev_time = rand_time
    end
  end

  rand_messages = rand_messages.sort_by { |obj| obj[:created_at] }
  rand_messages.each do |message|
    messages << Message.create!(message)
  end

  puts "Creating friendships..."
  demo_users = users[2..-1]
  friendships = []

  demo_users[0...-4].each do |demo_capy|
    user1, user2 = [demo_1, demo_capy].shuffle();
    friendships << Friend.create!({
      user1_id: user1.id,
      user2_id: user2.id
    })
  end

  demo_users[-4..-1].each do |demo_capy|
    user1, user2 = [demo_2, demo_capy].shuffle();
    friendships << Friend.create!({
      user1_id: user1.id,
      user2_id: user2.id
    })
  end

  puts "Creating friend requests..."
  FriendRequest.create!({
    sender_id: demo_2.id,
    receiver_id: demo_1.id
  })

  puts "Done seeding."
end