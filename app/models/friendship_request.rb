class FriendshipRequest < ActiveRecord::Base
  include RailsMultitenant::MultitenantModel

  multitenant_on :sender_id
  after_save :create_friendship

  def accept
    update_attributes(accepted?: true)
  end

  private

  def create_friendship
    sender.friendships << receiver_id  if accepted?
  end
end
