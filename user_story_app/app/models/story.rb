class Story < ActiveRecord::Base
  attr_accessible :as_a, :i_want_to, :so_i_can, :user_id, :complete
  belongs_to :user
end
