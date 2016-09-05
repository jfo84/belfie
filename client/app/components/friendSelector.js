import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Actions } from 'react-native-router-flux';

import Friend from '../components/friend';

import api from '../utils/api';

var styles = StyleSheet.create({
  friendList: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
  },
});

export default class FriendSelector extends Component {
  propTypes: {
    user: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = { friends: null, };
  }

  componentWillMount() {
    var _this = this;
    api.getFBFriends(this.props.user)
      .then((responseData) => {
        var friends = responseData.data.map((friend) => friend.name);
        _this.setState({ friends: friends, });
      })
      .done();
  }

  render() {
    if (this.state.friends == null) return this.renderLoading();
    var { friends } = this.state;
    var friendList = friends.map(friend => {
      <Friend name={friend} path={this.props.imagePath} />
    });

    return (
      <View style={styles.friendList}>
        {friendList}
      </View>
    )
  }

  renderLoading() {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  }
}
