class LoansChannel < ApplicationCable::Channel
  def subscribed
    stream_from "loans"
  end
end