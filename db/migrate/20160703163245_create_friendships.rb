class CreateFriendships < ActiveRecord::Migration
  def change
    create_table :friendships do |t|
      t.belongs_to :account, index: true, null: false
      t.belongs_to :user
      t.timestamps null: false
    end
  end
end
