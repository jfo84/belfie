# TODO: Allow factory_girl to understand its multitenant context within the DSL.
# Right now, we're manually adding account_id to every multitenant model factory
# YUCK

FactoryGirl.define do
  factory :friendship_request do
    account_id { Account.first.id }
    accepted? false
    association :sender, factory: :user
    association :receiver, factory: :user
    # factory :request_with_users do
    #   after(:create) do |request|
    #     create(:user, )
    #     request.sender = FactoryGirl.create(:user)
    #     request.receiver = FactoryGirl.create(:user)
    #   end
    # end
  end
end
