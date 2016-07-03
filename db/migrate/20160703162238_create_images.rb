class CreateImages < ActiveRecord::Migration
  def change
    create_table :images do |t|
      t.belongs_to :user, index: true, null: false
      t.string :url, null:false
      t.timestamps null: false
    end
  end
end
