FactoryGirl.define do
  # You must pass user_ids to the factory
  factory :friendship_request do
    sender_id nil
    receiver_id nil
    accepted? false
  end
end
