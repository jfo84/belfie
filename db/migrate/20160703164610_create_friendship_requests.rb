class CreateFriendshipRequests < ActiveRecord::Migration
  def change
    create_table :friendship_requests do |t|
      t.belongs_to :sender, class_name: :user, index: true, null: false
      t.belongs_to :receiver, class_name: :user, null: false
      t.boolean :accepted?, default: false
      t.timestamps null: false
    end
  end
end
