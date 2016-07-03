require 'spec_helper'

describe Friendship do

  describe 'creates a friendship via a request' do
    let(:sender) { create(:user) }
    let(:receiver) { create(:user) }
    let(:request) { create(:friendship_request, sender_id: sender.id, receiver_id: receiver.id) }

    it 'accepts the request' do
      request.accept
      expect(request.accepted?).to eq true
      expect(sender.friendships).to include receiver
      expect(receiver.friendships).to include sender
    end
  end

end
