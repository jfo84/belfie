import React, { Component } from 'react';
import {
  View,
} from 'react-native';

import {
  FBLogin,
  FBLoginManager,
} from 'react-native-facebook-login';

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
  getInitialState() {
    return { user: null, };
  }

  render() {
    var _this = this;
    var user = this.state.user;

    return (
      <View style={styles.loginContainer}>
        { user && <ProfileImage user={user} /> }
        { user && <ProfileInfo user={user} /> }
        <FBLogin style={styles.loginButton}
          permissions={["email","user_friends"]}
          onLogin={(data) => {
            console.log("Logged in!");
            console.log(data);
            _this.setState({ user: data.credentials, });
          }}
          onLogout={(){
            console.log("Logged out");
            _this.setState({ user: null, });
          }}
          onLoginFound={(data) => {
            console.log("Existing login found");
            console.log(data);
            _this.setState({ user: data.credentials, });
          }}
          onLoginNotFound={() => {
            console.log("No user logged in");
            _this.setState({ user: null, });
          }}
          onError={(data) => {
            console.log("Error");
            console.log(data);
          }}
          onCancel={() => {
            console.log("User cancelled");
          }}
          onPermissionsMissing={(data) => {
            console.log("Check permissions!");
            console.log(data);
          }} />
      </View>
    )
  }
}
