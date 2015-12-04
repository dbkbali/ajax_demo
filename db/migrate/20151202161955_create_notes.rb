class CreateNotes < ActiveRecord::Migration
  def change
    create_table :notes do |t|
      t.string :title
      t.text :description
      t.string :reference_url
      t.timestamps null: false
    end
  end
end
