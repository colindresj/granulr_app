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

  def adopt_parents_user_id
    self.user_id = self.parent.user_id
    self.save!
  end

  def create_hash_representation
    # creating a hash represetnation of our current object
    # for pleasent JS digestion
    builder = self.serializable_hash

    # assigning a new depth attribute to this recently
    # created hash
    builder['depth_attribute'] = self.depth

    # creating an array of children to house the current hash's
    # descendants, then running those descendents through this
    # very same method. It will continue until no children to call
    # method on
    hashed_children = []
    self.children.each do |child|
      # binding.pry
      hashed_children << child.create_hash_representation
    end

    # adding that subtree to the initial hash as children attribute
    builder['children'] = hashed_children

    # binding.pry

    # returning the completed hash
    builder
  end

end
