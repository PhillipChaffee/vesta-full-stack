class LoansController < ApplicationController
  before_action :set_loan, only: [:update]
  after_action :broadcast, only: [:create, :update]

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
    render json: Loan.all_stats
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_loan
    @loan = Loan.find(params[:id])
  end

  def broadcast
    ActionCable.server.broadcast("loans", Loan.where(deleted: false).as_json)
    ActionCable.server.broadcast("stats", Loan.all_stats.as_json)
  end

  # Only allow a trusted parameter "white list" through.
  def loan_params
    params.require(:loan).permit(:loan_officer_name, :property_address, :amount, :deleted, :deleted_by, :borrower_ids => [])
  end
end
