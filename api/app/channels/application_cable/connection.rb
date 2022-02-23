module ApplicationCable
  class Connection < ActionCable::Connection::Base
    def connect
      Rails.logger.info("Websocket connected")
    end
  end
end
