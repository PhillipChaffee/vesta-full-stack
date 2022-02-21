class CreateLoans < ActiveRecord::Migration[6.0]
  def change
    create_table :loans do |t|
      t.string :loan_officer_name
      t.string :property_address
      t.decimal :amount

      t.timestamps
    end
  end
end
