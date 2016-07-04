FactoryGirl.define do
  # You must pass user_ids to the factory
  factory :friendship_request do
    accepted? false
    factory :request_with_users do
      after(:create) do |request|
        binding.pry
        request.sender = FactoryGirl.create(:user)
        request.receiver = FactoryGirl.create(:user)
      end
    end
  end
end
