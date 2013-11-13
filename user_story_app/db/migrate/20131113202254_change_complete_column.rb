class ChangeCompleteColumn < ActiveRecord::Migration
  def change
    rename_column :stories, :complete, :completed
  end
end
