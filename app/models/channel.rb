# == Schema Information
#
# Table name: channels
#
#  id           :bigint           not null, primary key
#  name         :string           not null
#  server_id    :bigint           not null
#  channel_type :string           default("text"), not null
#  description  :string
#  first        :boolean          default(FALSE), not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
class Channel < ApplicationRecord
  TYPES = [
    "text",
    "voice"
  ].freeze

  validates :name, :server_id, presence: true
  after_validation :first, inclusion: { in: [true, false], message: "must be true or false" }

  after_validation :channel_type,
    inclusion: { in: TYPES, message: "'%{value}' is not a valid channel type"}

  belongs_to :server
  has_many :messages, inverse_of: :channel, dependent: :destroy
end
