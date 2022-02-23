class LoansController < ApplicationController
  before_action :set_loan, only: [:destroy]
  after_action :broadcast_loans, only: [:create, :destroy]

  # GET /loans
  def index
    @loans = Loan.where(deleted: false)

    render json: @loans
  end

  # POST /loans
  def create
    @loan = Loan.new(loan_params)
    @borrowers = Borrower.find(loan_params[:borrower_ids])

    if @borrowers.count.positive? && @loan.save
      @loan.borrowers << @borrowers
      render json: @loan, status: :created, location: @loan
    else
      render json: @loan.errors, status: :unprocessable_entity
    end
  end

  # DELETE /loans/1
  def destroy
    @loan.update!(deleted: true)
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
    params.require(:loan).permit(:loan_officer_name, :property_address, :amount, :borrower_ids => [])
  end
end
