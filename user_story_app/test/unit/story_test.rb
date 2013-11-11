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
#

require 'test_helper'

class StoryTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
