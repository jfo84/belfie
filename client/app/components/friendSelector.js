import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';

import { Actions } from 'react-native-router-flux';

import Friend from './friend';
import Separator from '../helpers/separator';
import api from '../utils/api';

var styles = StyleSheet.create({
  friendContainer: {
    padding: 10,
  },
  listContainer: {
    flex: 1,
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
        var friends = responseData.data;
        _this.setState({ friends, });
      })
      .done();
  }

  render() {
    if (this.state.friends == null) return this.renderLoading();
    var { friends, } = this.state;
    var { imagePath, } = this.props;
    var friendList = friends.map((friend, index) => {
      return(
        <View style={styles.friendContainer} key={index}>
          <Friend name={friend.name}
                  imagePath={imagePath} />
          <Separator />
        </View>
      )
    });

    return (
      <ScrollView style={styles.listContainer}>
        {friendList}
      </ScrollView>
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
