class Account < ActiveRecord::Base
  # This may seem weird, but with the way multitenancy was working with
  # factory_girl, the multitenant structure needs to be a model that has a user
  # or else creating the relationships between users became very weird. A
  # friendship_request was multitenant on the sender_id and that was
  # causing all sorts of problems
  include RailsMultitenant::GlobalContextRegistry::CurrentInstance
  has_one :user
end
