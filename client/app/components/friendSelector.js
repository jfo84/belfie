import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Actions } from 'react-native-router-flux';

import FriendList from '../components/friendList';

var styles = StyleSheet.create({
  friendList: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
  },
});

export default class FriendSelector extends Component {
  constructor(props) {
    debugger;
    super(props);
  }

  render() {
    const { friends } = this.props;
    const friendList = friends ? <FriendList friends={friends} /> : null;

    return (
      <View>
        <View style={styles.friendList}>
          {friendList}
        </View>
        <Text onPress={this.selectFriends.bind(this)}>
          Send Your Belfie!
        </Text>
      </View>
    )
  }

  selectFriends() {
    let props = this.state.props;
    Actions.belfieUploader({props});
  }
}
