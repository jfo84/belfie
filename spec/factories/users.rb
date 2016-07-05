FactoryGirl.define do
  factory :user do
    account_id { Account.current.id }
    name 'Blah Man'
    email 'blahblahblah@blah.com'
  end
end
