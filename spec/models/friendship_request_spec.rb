require 'spec_helper'

describe FriendshipRequest do

  describe 'creates a friendship via a request' do
    let(:request) { create(:friendship_request) }
    let(:sender) { request.sender }
    let(:receiver) { request.receiver }

    it 'accepts the request' do
      request.accept
      expect(request.accepted?).to eq true
      expect(sender.users).to include receiver
      expect(receiver.users).to include sender
    end
  end

end
