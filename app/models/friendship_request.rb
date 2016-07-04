class FriendshipRequest < ActiveRecord::Base
  include RailsMultitenant::MultitenantModel

  multitenant_on :account_id
  after_save :create_friendship
  has_one :sender
  has_one :receiver

  def accept
    update_attributes(accepted?: true)
  end

  private

  def create_friendship
    sender.friendships << receiver  if accepted?
  end
end
