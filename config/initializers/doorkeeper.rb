Doorkeeper.configure do
  resource_owner_from_assertion do
    facebook = URI.parse('https://graph.facebook.com/me?access_token=' +
    params[:assertion])
    response = Net::HTTP.get_response(facebook)
    user_data = JSON.parse(response.body)
    User.find_by(facebook_id: user_data['id'])
  end

  # add your supported grant types and other extensions
  grant_flows %w(assertion authorization_code implicit password client_credentials)
end
