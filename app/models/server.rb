# == Schema Information
#
# Table name: servers
#
#  id               :bigint           not null, primary key
#  name             :string           not null
#  owner_id         :bigint           not null
#  picture_url      :string
#  invite_link      :string           not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  first_channel_id :bigint
#
class Server < ApplicationRecord
  validates :owner_id, presence: true
  validates :name, length: { in: 2..100, message: "Must be between 2 and 100 in length." }
  validates :invite_link, uniqueness: true

  before_create :add_invite_link
  after_create :add_owner_membership, :create_first_channel

  has_one_attached :photo

  belongs_to :owner, class_name: :User
  has_many :channels, inverse_of: :server, dependent: :destroy
  has_many :memberships, inverse_of: :server, dependent: :destroy
  has_many :messages, through: :channels, source: :messages
  has_many :members, through: :memberships, source: :member

  private
  def add_invite_link
    while true
      self.invite_link = SecureRandom.uuid.split('-')[0]
      return unless Server.exists?(self.invite_link)
    end
  end

  def add_owner_membership
    Membership.create!({
      member_id: owner_id,
      server_id: self.id,
      position: "owner"
    })
  end

  def create_first_channel
    first_channel = Channel.create!({
      name: "general",
      server_id: self.id
    })

    self.first_channel_id = first_channel.id
    self.save!
  end
end
