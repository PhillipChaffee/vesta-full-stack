class Borrower < ApplicationRecord
  validates :first_name, :last_name, :phone_number, presence: true
  validates :phone_number, uniqueness: true

  has_and_belongs_to_many :loans
end
