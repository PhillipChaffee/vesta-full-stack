class SoftDeleteLoans < ActiveRecord::Migration[6.0]
  def change
    add_column :loans, :deleted, :boolean, default: false, null: false
    add_reference :borrowers, :deleted_by
  end
end
