class AddUniqueConstraints < ActiveRecord::Migration[6.0]
  def change
    add_index :borrowers, :phone_number, unique: true
    add_index :loans, :property_address, unique: true
  end
end
