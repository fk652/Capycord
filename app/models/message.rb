# == Schema Information
#
# Table name: messages
#
#  id         :bigint           not null, primary key
#  body       :string           not null
#  channel_id :bigint           not null
#  author_id  :bigint           not null
#  status     :string           default("original"), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Message < ApplicationRecord
  STATUS = [
    "original",
    "edited",
    "deleted",
    "pinned"
  ].freeze

  validates :body, :channel_id, :author_id, :status, presence: true
  # before_validation :ensure_valid_member

  after_validation :status,
    inclusion: { in: STATUS, message: "'%{value}' is not a valid status"}

  belongs_to :author, class_name: :User
  belongs_to :channel

  private
  def ensure_valid_member 
    if !User.find(self.author_id).channel_memberships.find(self.channel_id)
      errors.add(:error, "Not a valid member")
    end
  end
end
