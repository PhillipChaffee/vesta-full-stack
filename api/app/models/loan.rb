class Loan < ApplicationRecord
  validates :loan_officer_name, :property_address, :amount, presence: true
  validates :property_address, uniqueness: true

  has_and_belongs_to_many :borrowers

  def as_json(options = {})
    super(options).merge({ borrowerCount: borrowers.count })
  end
end
