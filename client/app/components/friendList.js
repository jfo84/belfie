import React, { Component } from 'react';
import {
  View,
} from 'react-native';

import Friend from './friend';

export default class FriendList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
      const { friends } = this.props;
      const friendsList = friends.map(friend => {
        <Friend id={friend.id} name={friend.name} />
      });

      return (
        <View style={{flex: 1}}>
          {friendsList}
        </View>
      )
    }
}
