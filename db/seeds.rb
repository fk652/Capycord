ApplicationRecord.transaction do 
  puts "Destroying tables..."
  User.destroy_all

  puts "Resetting primary keys..."
  ApplicationRecord.connection.reset_pk_sequence!('users')

  puts "Creating users..."
  User.create!(
    username: 'Capybaby', 
    email: 'capybara@gmail.com', 
    password: 'password123',
    custom_status: 'CAPYBARA CAPYBARA CAPYBARA 🦫',
    profile_picture_url: 'https://www.rainforest-alliance.org/wp-content/uploads/2021/06/capybara-square-1.jpg.optimal.jpg'
  )

  User.create!(
    username: 'SSJ Capy', 
    email: 'capybara2@gmail.com', 
    password: 'password123',
    custom_status: 'CAPYBARA OVER 9000 💢',
    profile_picture_url: 'https://cdn.drawception.com/images/panels/2017/5-4/wR4kkj9B1j-2.png'
  )

  10.times do 
    User.create!({
      username: Faker::Internet.unique.username(specifier: 3),
      email: Faker::Internet.unique.email,
      password: 'password',
      online_status: User::STATUS[0..1].sample(),
      set_online_status: User::STATUS[1..-1].sample(),
      custom_status: [Faker::Quote.unique.famous_last_words, ''].sample()
    }) 
  end

  puts "Done seeding."
end