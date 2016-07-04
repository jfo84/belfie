require 'spec_helper'

describe Friendship do

  describe 'creates a friendship via a request' do
    let(:request) { create(:request_with_users) }
    let(:sender) { request.sender }
    let(:receiver) { request.receciver }

    it 'accepts the request' do
      request.accept
      expect(request.accepted?).to eq true
      expect(sender.friendships).to include receiver
      expect(receiver.friendships).to include sender
    end
  end

end
