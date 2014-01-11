class CreateStoryTable < ActiveRecord::Migration
  def change
    create_table(:stories) do |t|
      t.string  :as_a
      t.string :i_want_to
      t.string :so_i_can
      t.integer :user_id
      t.integer :parent_id
      t.boolean :completed

      t.timestamps
    end
  end
end
