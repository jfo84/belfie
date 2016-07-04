class User < ActiveRecord::Base
  include RailsMultitenant::MultitenantModel

  multitenant_on :account_id
  has_and_belongs_to_many :friendships, after_add: :create_complement_friendship,
                                        after_remove: :remove_complement_friendship
  has_many :images
  has_many :friendship_requests

  def has_friends?
    friendships.any?
  end

  private

  def create_complement_friendship(friend)
    friend.friendships << self  unless friend.friendships.include?(self)
  end

  def remove_complement_friendship(friend)
    friend.friendships.delete(self)
  end
end
