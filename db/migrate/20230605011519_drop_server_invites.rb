class DropServerInvites < ActiveRecord::Migration[7.0]
  def change
    drop_table :server_invites
  end
end
