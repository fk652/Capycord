class CreateChannels < ActiveRecord::Migration[7.0]
  def change
    create_table :channels do |t|
      t.string :name, null: false
      t.references :server, foreign_key: true, index: true, null: false
      t.string :channel_type, null: false, default: "text"
      t.string :description
      t.boolean :first, null: false, default: false

      t.timestamps
    end
  end
end
