# == Schema Information
#
# Table name: users
#
#  id                  :bigint           not null, primary key
#  email               :string           not null
#  username            :string           not null
#  password_digest     :string           not null
#  session_token       :string           not null
#  online_status       :string           default("offline"), not null
#  set_online_status   :string           default("online"), not null
#  custom_status       :string           default(""), not null
#  profile_picture_url :string           default(""), not null
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#
class User < ApplicationRecord
  has_secure_password

  STATUS = [
    "Offline",
    "Online",
    "Idle",
    "Do Not Disturb",
    "Invisible"
  ].freeze

  validates :email, :session_token, 
    presence: true, 
    uniqueness: true
  validates :username,
    presence: true
  # validates :username, 
  #   length: { in: 2..32 }, 
  #   format: { without: URI::MailTo::EMAIL_REGEXP, message: "can't be email" }
  # validates :username,
  #   format: { without: /@|#|:|```|discord/, message: "can't include @, #, :, ```, discord"}
  # validates :username,
  #   format: { without: /(^everyone$)|(^here$)/, message: "can't be 'everyone' or 'here'"}
  validates :email, 
    length: { in: 3..255 }, 
    format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password, 
    length: { in: 8..128 }, 
    allow_nil: true
  validates :custom_status,
    length: { maximum: 128 }

  before_validation :ensure_session_token
  before_create :add_tag_number
  # before_create :username, 
  #   length: { in: 2..32 }, 
  #   format: { without: URI::MailTo::EMAIL_REGEXP, message: "can't be email" }
  # before_create :username,
  #   format: { without: /@|#|:|```|discord/, message: "can't include @, #, :, ```, discord"}
  # before_create :username,
  #   format: { without: /(^everyone$)|(^here$)/, message: "can't be 'everyone' or 'here'"}
  before_create :validate_username
  before_update :ensure_unique_tag_username

  after_validation :custom_status, :online_status, :set_online_status,
    presence: true
  after_validation :online_status,
    inclusion: { in: STATUS, message: "'%{value}' is not a valid status"}
  after_validation :set_online_status,
    inclusion: { in: STATUS[1..-1], message: "'%{value}' is not a valid status"}

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    return user && user.authenticate(password) ? user : nil
  end

  def reset_session_token!
    self.session_token = generate_unique_session_token()
    self.save!
    return self.session_token
  end

  private
  def generate_unique_session_token
    while true
      token = SecureRandom.urlsafe_base64
      return token unless User.exists?(session_token: token)
    end
  end

  def generate_random_tag_number
    "##{rand(0..9)}#{rand(0..9)}#{rand(0..9)}#{rand(0..9)}"
  end

  def ensure_session_token
    self.session_token ||= generate_unique_session_token()
  end

  def add_tag_number
    while true
      tag_number = generate_random_tag_number
      unless User.exists?("#{self.username}#{tag_number}")
        self.username = "#{self.username}#{tag_number}"
        return
      end
    end
  end

  def ensure_unique_tag_username
    if self.username_changed?
      username = self.username.split("#")
      if (username.length > 2)
        errors.add(:username, "can't include #")
        return
      end
      
      username = username[0]
      validate_username(username)

      while User.exists?(self.username)
        tag = generate_random_tag_number
        self.username = username + tag
      end
    end
  end

  def validate_username(username = self.username)
    if username.length < 2 || username.length > 32
      errors.add(:username, "must be 2 to 32 characters long")
    end
    if URI::MailTo::EMAIL_REGEXP.match(username)
      errors.add(:username, "can't be email")
    end
    if /@|#|:|```|discord/.match(username)
      errors.add(:username, "can't include @, #, :, ```, discord")
    end
    if /(^everyone$)|(^here$)/.match(username)
      errors.add(:username, "can't be 'everyone' or 'here'")
    end
  end
end
