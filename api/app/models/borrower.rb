class Borrower < ApplicationRecord
  validates :first_name, :last_name, :phone_number, presence: true
  validates :phone_number, uniqueness: true
end
