import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import {
  FBLogin,
  FBLoginManager,
} from 'react-native-facebook-login';

import { Actions } from 'react-native-router-flux';

import ProfileImage from './profileImage';
import ProfileInfo from './profileInfo';

var styles = StyleSheet.create({
  loginButton: {
    marginBottom: 10,
  },
  loginContainer: {
    marginTop: 150,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomBump: {
    marginBottom: 15,
  },
});

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { user: null, };
  }

  takeBelfies() {
    var { user } = this.state;
    Actions.belfieTaker({ user });
  }

  renderActions() {
    return(
      <Text
        onPress={this.takeBelfies.bind(this)}>
        Take a Belfie!
      </Text>
    )
  }

  render() {
    var _this = this;
    var user = this.state.user;

    return (
      <View style={styles.loginContainer}>
        { user && <ProfileImage user={user} /> }
        { user && <ProfileInfo user={user} /> }
        <FBLogin style={styles.loginButton}
          permissions={['email','user_friends']}
          onLogin={(data) => {
            console.log('Logged in!');
            console.log(data);
            _this.setState({ user: data.credentials, });
          }}
          onLogout={() => {
            console.log('Logged out');
            _this.setState({ user: null, });
          }}
          onLoginFound={(data) => {
            console.log('Existing login found');
            console.log(data);
            _this.setState({ user: data.credentials, });
          }}
          onLoginNotFound={() => {
            console.log('No user logged in');
            _this.setState({ user: null, });
          }}
          onError={(data) => {
            console.log('Error');
            console.log(data);
          }}
          onCancel={() => {
            console.log('User cancelled');
          }}
          onPermissionsMissing={(data) => {
            console.log('Check permissions!');
            console.log(data);
          }} />
        { user && this.renderActions() }
      </View>
    )
  }
}
