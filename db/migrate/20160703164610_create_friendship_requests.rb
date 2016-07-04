class CreateFriendshipRequests < ActiveRecord::Migration
  def change
    create_table :friendship_requests do |t|
      t.belongs_to :account, index: true, null: false
      t.belongs_to :sender, class_name: :user
      t.belongs_to :receiver, class_name: :user
      t.boolean :accepted?, default: false
      t.timestamps null: false
    end
  end
end
