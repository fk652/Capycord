class CreateServerInvites < ActiveRecord::Migration[7.0]
  def change
    create_table :server_invites do |t|
      t.references :server, foreign_key: true, index: true, null: false
      t.references :sender, foreign_key: {to_table: :users}, index: true, null: false
      t.references :receiver, foreign_key: {to_table: :users}, index: true, null: false
      t.string :status, null: false, default: "pending"

      t.timestamps
    end
  end
end
