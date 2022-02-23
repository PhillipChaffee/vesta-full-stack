class Loan < ApplicationRecord
  validates :loan_officer_name, :property_address, :amount, presence: true
  validates :property_address, uniqueness: true

  has_and_belongs_to_many :borrowers

  def self.all_stats
    { createdStats: Loan.created_stats, deletedStats: Loan.deleted_stats, genericStats: Loan.generic_stats }
  end

  def self.created_stats
    all_loans = Loan.all
    created_stats = [{ loanOfficer: "All Officers", count: all_loans.count }]
    by_loan_officer = all_loans.group(:loan_officer_name).count
    by_loan_officer.each { |lo, count| created_stats << { loanOfficer: lo, count: count } }
    created_stats
  end

  def self.deleted_stats
    deleted_loans = Loan.where(deleted: true)
    deleted_stats = [{ loanOfficer: "All Officers", count: deleted_loans.count }]
    by_loan_officer = deleted_loans.group(:deleted_by).count
    by_loan_officer.each { |lo, count| deleted_stats << { loanOfficer: lo, count: count } }
    deleted_stats
  end

  def self.generic_stats
    all_borrower_counts = Loan.all.map { |l| l.borrowers.count }
    { medianBorrowerCount: StatsHelper.median(all_borrower_counts), meanLoanAmount: Loan.all.average(:amount) }
  end

  def as_json(options = {})
    super(options).merge({ borrowerCount: borrowers.count })
  end
end
