class Image < ActiveRecord::Base
  include RailsMultitenant::MultitenantModel

  multitenant_on :account_id
end
