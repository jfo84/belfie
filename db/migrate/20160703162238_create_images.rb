class CreateImages < ActiveRecord::Migration
  def change
    create_table :images do |t|
      t.belongs_to :account, index: true, null: false
      t.belongs_to :user
      t.string :url, null:false
      t.timestamps null: false
    end
  end
end
