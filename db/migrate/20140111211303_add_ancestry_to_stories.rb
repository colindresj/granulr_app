class AddAncestryToStories < ActiveRecord::Migration
  def change
    add_column :stories, :ancestry, :string
    add_index :stories, :ancestry
  end
end
