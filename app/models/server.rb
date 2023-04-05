# == Schema Information
#
# Table name: servers
#
#  id          :bigint           not null, primary key
#  name        :string           not null
#  owner_id    :bigint           not null
#  picture_url :string
#  invite_link :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Server < ApplicationRecord
  validates :name, :owner_id, presence: true
  validates :invite_link, uniqueness: true

  before_create :add_invite_link
  after_create :add_owner_membership

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
end
