class Loan < ApplicationRecord
  validates :loan_officer_name, :property_address, :amount, presence: true
  validates :property_address, uniqueness: true
end
