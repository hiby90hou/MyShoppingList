class CreateTodoings < ActiveRecord::Migration[5.1]
  def change
    create_table :todoings do |t|
      t.references :user, foreign_key: true
      t.string :todos

      t.timestamps
    end
  end
end
