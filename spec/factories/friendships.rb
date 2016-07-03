FactoryGirl.define do
  # You must pass user_ids to the factory
  factory :friendship_request do
    sender nil
    receiver nil
    accepted? false
  end
end
