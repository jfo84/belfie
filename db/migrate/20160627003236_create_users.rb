class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.belongs_to :account, index: true, null: false
      t.string :name
      t.string :email
      t.belongs_to :friendship
      t.timestamps null: false
    end
  end
end
