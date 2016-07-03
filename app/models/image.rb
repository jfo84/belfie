class Image < ActiveRecord::Base
  include RailsMultitenant::MultitenantModel

  multitenant_on :user_id
end
