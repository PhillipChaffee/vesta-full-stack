class LoansController < ApplicationController
  # GET /loans
  def index
    @loans = Loan.all

    render json: @loans
  end

  # POST /loans
  def create
    @loan = Loan.new(loan_params)
    @borrowers = Borrower.find(loan_params[:borrower_ids])

    if @borrowers.count.positive? && @loan.save
      @loan.borrowers << @borrowers
      ActionCable.server.broadcast("loans", Loan.all.as_json)
      render json: @loan, status: :created, location: @loan
    else
      render json: @loan.errors, status: :unprocessable_entity
    end
  end

  private
    # Only allow a trusted parameter "white list" through.
    def loan_params
      params.require(:loan).permit(:loan_officer_name, :property_address, :amount, :borrower_ids => [])
    end
end
