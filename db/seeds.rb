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
    "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjNjMTM2ODc3ZmI3NDVmMDJkODhlNDE3ZGJiYzRjZjU0ZTNiMWYzNyZjdD1n/l4Ki01RIvdIQVFhqE/giphy.gif",
    "https://i1.sndcdn.com/avatars-DcpRNTjsnQ2RUU3J-b22Z2g-t500x500.jpg",
    "https://media0.giphy.com/media/rxzyeEkp0oQ47QQCKk/giphy.gif",
    "https://storage.googleapis.com/ares-profile-pictures/hd/capybara.man-fa872b7af51b73a11b47cdf18270870f_hd.jpg",
    "https://i.pinimg.com/originals/a1/0e/71/a10e71e4e4245d2952ad40850d0124b3.gif",
    "https://www.rainforest-alliance.org/wp-content/uploads/2021/06/capybara-square-1.jpg.optimal.jpg",
    "https://media0.giphy.com/media/RKLvNCafB1Zkf5JfZW/giphy.gif",
    "https://upload.wikimedia.org/wikipedia/commons/8/8e/Yellow-headed_caracara_%28Milvago_chimachima%29_on_capybara_%28Hydrochoeris_hydrochaeris%29.JPG",
    "https://media.tenor.com/TsqORryufiUAAAAM/chilling-annoyed.gif",
    "https://i.pinimg.com/736x/ad/cb/93/adcb93adc6397fa2a9229840b89c66d5.jpg",
    "https://media0.giphy.com/media/hi2kPofVMW70k/giphy.gif",
    "https://www.artmajeur.com/medias/standard/j/p/jp-eugster/artwork/16391596_kingsize-capybara-3.jpg",
    "https://i.etsystatic.com/15332298/r/il/da85ac/1935059239/il_fullxfull.1935059239_l0ky.jpg",
    "https://i.pinimg.com/originals/1b/bc/9c/1bbc9c249cfcf9bf40a49ae1575da3fb.jpg",
    "https://64.media.tumblr.com/58d224fd237c3c4d87c52d519c24185e/tumblr_npmr6xJ8yW1u6hbi4o1_250.jpg",
    "https://metro.co.uk/wp-content/uploads/2015/08/marmot.png",
    "https://i.pinimg.com/originals/96/57/4c/96574ccd432266b9115b6da825ac20e1.jpg"
  ]

  usernames = [
    "Uncle Wombat",
    "CapyChatty",
    "CapyChillin",
    "CapySUS",
    "Capycito",
    "CapyStareintoyoursoul",
    "CapyGucci",
    "Capy-chan OwO",
    "CapyChad",
    "CapyBirb",
    "CapyHappy",
    "Capy NOM NOM NOM",
    "King Capy IV, Lord of Rails",
    "Alfred Fitzgerald",
    "CapySean",
    "CapyKhan",
    "GopherGary",
    "Capycita"
  ]

  customs = [
    "Let's be friends",
    "Why doesn't anyone ever listen to me?",
    "",
    "ඞ",
    "",
    "",
    "",
    "(✿◕‿◕✿)",
    "life is an adventure that is best lived boldly.",
    "",
    "",
    "NOM NOM NOM NOM NOM NOM NOM NOM NOM",
    "Long live the king",
    "A gentleman is simply a patient capybara.",
    "bruh 🦫",
    "The capybara below me is cheating on their lover with a gopher",
    "I'm that gopher",
    "In a happy relationship with CapySean 💖. Buying flowers on Amazon later"
  ]

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

  puts "Creating users..."
  users = []
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
  
  (0...profile_image_urls.length).each do |i| 
    users << User.create!({
      # username: Faker::Internet.unique.username(specifier: 3),
      username: usernames[i],
      email: Faker::Internet.unique.email,
      password: 'password',
      online_status: User::STATUS[0..1].sample(),
      set_online_status: User::STATUS[1..-1].sample(),
      # custom_status: [Faker::Quote.unique.famous_last_words, ''].sample(),
      custom_status: customs[i],
      profile_picture_url: profile_image_urls[i],
      created_at: rand(10.0..20.0).days.ago
    }) 
  end

  puts "Creating servers..."
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
  servers.each_with_index do |server, idx|
    users_copy = User.where.not(id: server.owner.id).to_a
    memberships[server.id] = []

    if (idx == 0 || idx == 1) 
      demo_user = users_copy.delete_at(0)
      memberships[server.id] << Membership.create!({
        member_id: demo_user.id,
        server_id: server.id,
        nickname: [Faker::JapaneseMedia::Naruto.character, nil].sample()
      })
    end

    rand(5..users_copy.length).times do 
      rand_user = users_copy.delete_at(rand(users_copy.length))
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

  # puts "Creating server invites..."
  # to do later
  # should only be invites to and from demo users

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