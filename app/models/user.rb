class User < ActiveRecord::Base
  include RailsMultitenant::MultitenantModel

  multitenant_on :account_id
  has_many :friendships, foreign_key: :sender_user_id, dependent: :destroy
  has_many :reverse_friendships, class_name: :Friendship, foreign_key: :receiver_user_id, dependent: :destroy
  has_many :friends, class_name: :User, through: :friendships, source: :receiver_user
  has_many :images
  has_many :friendship_requests

  def has_friends?
    friends.any?
  end
end
