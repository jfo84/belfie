module V1
  class FriendsController < ApplicationController
    before_action :set_current_id

    def show
      respond_with(Account.current.user.friends.find { |friend| friend.id == friend_id })
    end

    def index
      respond_with(Account.current.user.friends)
    end

    private

    def set_current_id
      Account.current_user_id = params.fetch(:user_id)
    end

    def friend_params
      params.slice(:user_id, :friend_id)
    end
  end
end
