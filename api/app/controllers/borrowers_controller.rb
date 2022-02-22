class BorrowersController < ApplicationController
  # GET /borrowers
  def index
    @borrowers = Borrower.all

    render json: @borrowers
  end

  # POST /borrowers
  def create
    @borrower = Borrower.new(borrower_params)

    if @borrower.save
      render json: @borrower, status: :created, location: @borrower
    else
      render json: @borrower.errors, status: :unprocessable_entity
    end
  end

  private
    # Only allow a trusted parameter "white list" through.
    def borrower_params
      params.require(:borrower).permit(:first_name, :last_name, :phone_number)
    end
end
