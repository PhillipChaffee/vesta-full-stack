require 'test_helper'

class LoansControllerTest < ActionDispatch::IntegrationTest
  setup do
    @loan = loans(:one)
  end

  test "should get index" do
    get loans_url, as: :json
    assert_response :success
  end

  test "should create loan" do
    assert_difference('Loan.count') do
      post loans_url, params: { loan: { amount: @loan.amount, loan_officer_name: @loan.loan_officer_name, property_address: @loan.property_address } }, as: :json
    end

    assert_response 201
  end

  test "should show loan" do
    get loan_url(@loan), as: :json
    assert_response :success
  end

  test "should update loan" do
    patch loan_url(@loan), params: { loan: { amount: @loan.amount, loan_officer_name: @loan.loan_officer_name, property_address: @loan.property_address } }, as: :json
    assert_response 200
  end

  test "should destroy loan" do
    assert_difference('Loan.count', -1) do
      delete loan_url(@loan), as: :json
    end

    assert_response 204
  end
end
