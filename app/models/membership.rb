# == Schema Information
#
# Table name: memberships
#
#  id         :bigint           not null, primary key
#  member_id  :bigint           not null
#  server_id  :bigint           not null
#  position   :string           default("member"), not null
#  nickname   :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Membership < ApplicationRecord
  POSITIONS = [
    "member",
    "admin",
    "owner",
    "blocked"
  ]

  validates :member_id, :server_id, presence: true
  validates :server_id, uniqueness: {scope: :member_id, message: "already a member of the server"}

  after_validation :position,
    inclusion: { in: POSITIONS, message: "'%{value}' is not a valid position"}

  belongs_to :member, class_name: :User
  belongs_to :server
end
