class CreateBorrowers < ActiveRecord::Migration[6.0]
  def change
    create_table :borrowers do |t|
      t.string :first_name
      t.string :last_name
      t.integer :phone_number

      t.timestamps
    end
  end
end
