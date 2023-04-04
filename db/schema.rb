# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_04_04_193107) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "channels", force: :cascade do |t|
    t.string "name", null: false
    t.bigint "server_id", null: false
    t.string "channel_type", default: "text", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["server_id"], name: "index_channels_on_server_id"
  end

  create_table "friend_requests", force: :cascade do |t|
    t.bigint "sender_id", null: false
    t.bigint "receiver_id", null: false
    t.string "status", default: "pending", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["receiver_id"], name: "index_friend_requests_on_receiver_id"
    t.index ["sender_id"], name: "index_friend_requests_on_sender_id"
  end

  create_table "friends", force: :cascade do |t|
    t.bigint "user1_id", null: false
    t.bigint "user2_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user1_id", "user2_id"], name: "index_friends_on_user1_id_and_user2_id", unique: true
    t.index ["user2_id"], name: "index_friends_on_user2_id"
  end

  create_table "memberships", force: :cascade do |t|
    t.bigint "server_id", null: false
    t.bigint "member_id", null: false
    t.string "position", default: "member", null: false
    t.string "nickname"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["member_id"], name: "index_memberships_on_member_id"
    t.index ["server_id", "member_id"], name: "index_memberships_on_server_id_and_member_id", unique: true
  end

  create_table "messages", force: :cascade do |t|
    t.string "body", null: false
    t.bigint "channel_id", null: false
    t.bigint "author_id", null: false
    t.string "status", default: "original", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_id"], name: "index_messages_on_author_id"
    t.index ["channel_id"], name: "index_messages_on_channel_id"
  end

  create_table "server_invites", force: :cascade do |t|
    t.bigint "server_id", null: false
    t.bigint "sender_id", null: false
    t.bigint "receiver_id", null: false
    t.string "status", default: "pending", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["receiver_id"], name: "index_server_invites_on_receiver_id"
    t.index ["sender_id"], name: "index_server_invites_on_sender_id"
    t.index ["server_id"], name: "index_server_invites_on_server_id"
  end

  create_table "servers", force: :cascade do |t|
    t.string "name", null: false
    t.bigint "owner_id", null: false
    t.string "picture_url"
    t.string "invite_link", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["invite_link"], name: "index_servers_on_invite_link", unique: true
    t.index ["owner_id"], name: "index_servers_on_owner_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "username", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.string "online_status", default: "Offline", null: false
    t.string "set_online_status", default: "Online", null: false
    t.string "custom_status", default: "", null: false
    t.string "profile_picture_url", default: "", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  add_foreign_key "channels", "servers"
  add_foreign_key "friend_requests", "users", column: "receiver_id"
  add_foreign_key "friend_requests", "users", column: "sender_id"
  add_foreign_key "friends", "users", column: "user1_id"
  add_foreign_key "friends", "users", column: "user2_id"
  add_foreign_key "memberships", "servers"
  add_foreign_key "memberships", "users", column: "member_id"
  add_foreign_key "messages", "channels"
  add_foreign_key "messages", "users", column: "author_id"
  add_foreign_key "server_invites", "servers"
  add_foreign_key "server_invites", "users", column: "receiver_id"
  add_foreign_key "server_invites", "users", column: "sender_id"
  add_foreign_key "servers", "users", column: "owner_id"
end
