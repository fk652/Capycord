# == Schema Information
#
# Table name: server_invites
#
#  id          :bigint           not null, primary key
#  server_id   :bigint           not null
#  sender_id   :bigint           not null
#  receiver_id :bigint           not null
#  status      :string           default("pending"), not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class ServerInvite < ApplicationRecord
end
