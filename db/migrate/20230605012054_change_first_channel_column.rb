class ChangeFirstChannelColumn < ActiveRecord::Migration[7.0]
  def change
    remove_column :channels, :first, :boolean
    add_column :servers, :first_channel_id, :bigint
  end
end
