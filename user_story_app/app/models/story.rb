# == Schema Information
#
# Table name: stories
#
#  id         :integer          not null, primary key
#  as_a       :string(255)
#  i_want_to  :string(255)
#  so_i_can   :string(255)
#  user_id    :integer
#  complete   :boolean          default(FALSE)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  ancestry   :string(255)
#

class Story < ActiveRecord::Base
  attr_accessible :as_a, :i_want_to, :so_i_can, :user_id, :complete, :parent_id
  belongs_to :user
  has_ancestry
end
