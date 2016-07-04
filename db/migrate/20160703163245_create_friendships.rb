class CreateFriendships < ActiveRecord::Migration
  def change
    create_table :friendships, :force => true, :id => false do |t|
      t.integer :sender_user_id
      t.integer :receiver_user_id
      t.timestamps null: false
    end
  end
end
