class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :email, null: false
      t.string :username, null: false
      t.string :password_digest, null: false
      t.string :session_token, null: false
      t.string :online_status, null: false, default: "offline"
      t.string :set_online_status, null: false, default: "online"
      t.string :custom_status, null: false, default: ""
      t.string :profile_picture_url, null: false, default: ""

      t.timestamps
    end
    add_index :users, :email, unique: true
    add_index :users, :username, unique: true
    add_index :users, :session_token, unique: true
  end
end
