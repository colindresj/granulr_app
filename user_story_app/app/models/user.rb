class User < ActiveRecord::Base
  attr_accessible :email, :name, :phone
  validates :name, :email, :presence => true
  has_many :stories
end
