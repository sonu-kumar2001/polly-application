class AddForeignKeyToVotes < ActiveRecord::Migration[6.0]
  def change
    add_foreign_key :votes, :users, column: :user_id, on_delete: :cascade
    add_foreign_key :votes, :polls, column: :poll_id, on_delete: :cascade
    add_foreign_key :votes, :options, column: :option_id, on_delete: :cascade
  end
end
