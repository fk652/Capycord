class CreateServers < ActiveRecord::Migration[7.0]
  def change
    create_table :servers do |t|
      t.string :name, null: false
      t.references :owner, foreign_key: {to_table: :users}, index: true, null: false
      t.string :picture_url
      t.string :invite_link, null: false, index: {unique: true}

      t.timestamps
    end
  end
end
