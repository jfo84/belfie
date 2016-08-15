import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

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
    super(props);
  }

  render() {
      const { friends } = this.props;
      const friendList = friends ? <FriendList friends={friends} /> : null;

      return (
        <View style={styles.friendList}>
          {friendList}
        </View>
      )
    }
}
