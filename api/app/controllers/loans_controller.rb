class LoansController < ApplicationController
  include StatsHelper

  before_action :set_loan, only: [:update]
  after_action :broadcast_loans, only: [:create, :update]

  # GET /loans
  def index
    @loans = Loan.where(deleted: false)

    render json: @loans
  end

  # POST /loans
  def create
    @loan = Loan.new(loan_params)

    if @loan.save
      render json: @loan, status: :created, location: @loan
    else
      render json: @loan.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /loans/1
  def update
    if @loan.update(loan_params)
      render json: @loan
    else
      render json: @loan.errors, status: :unprocessable_entity
    end
  end

  def stats
    all_loans = Loan.all
    created_stats = [{ loanOfficer: "All Officers", count: all_loans.count }]
    by_loan_officer = all_loans.group(:loan_officer_name).count
    by_loan_officer.each { |lo, count| created_stats << { loanOfficer: lo, count: count } }

    deleted_loans = Loan.where(deleted: true)
    deleted_stats = [{ loanOfficer: "All Officers", count: deleted_loans.count }]
    by_loan_officer = deleted_loans.group(:deleted_by).count
    by_loan_officer.each { |lo, count| deleted_stats << { loanOfficer: lo, count: count } }

    all_borrower_counts = Loan.all.map { |l| l.borrowers.count }
    generic_stats = { medianBorrowerCount: median(all_borrower_counts), meanLoanAmount: Loan.all.average(:amount) }

    render json: { createdStats: created_stats, deletedStats: deleted_stats, genericStats: generic_stats }
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_loan
    @loan = Loan.find(params[:id])
  end

  def broadcast_loans
    ActionCable.server.broadcast("loans", Loan.where(deleted: false).as_json)
  end

  # Only allow a trusted parameter "white list" through.
  def loan_params
    params.require(:loan).permit(:loan_officer_name, :property_address, :amount, :deleted, :deleted_by, :borrower_ids => [])
  end
end
