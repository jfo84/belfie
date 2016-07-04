class FriendshipRequest < ActiveRecord::Base
  include RailsMultitenant::MultitenantModel

  multitenant_on :account_id
  after_save :create_friendship
  belongs_to :sender, :class_name => 'User'
  belongs_to :receiver, :class_name => 'User'

  def accept
    update_attributes(accepted?: true)
  end

  private

  def create_friendship
    sender.friendships << receiver if accepted?
  end
end
