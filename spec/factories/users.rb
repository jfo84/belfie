FactoryGirl.define do
  factory :user do
    account_id { Account.first.id }
    name 'Blah Man'
    email 'blahblahblah@blah.com'
  end
end
