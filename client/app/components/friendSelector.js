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
  listContainer: {
    marginTop: 65,
    flex: 1,
  },
});

export default class FriendSelector extends Component {
  constructor(props) {
    super(props);
    this.state = { friends: null, };
  }

  componentWillMount() {
    var _this = this;
    api.getFBFriends(this.props.user)
      .then((responseData) => {
        var friends = responseData.data;
        _this.setState({ friends });
      })
      .done();
  }

  render() {
    if (this.state.friends == null) return this.renderLoading();
    var { friends } = this.state;
    var { user, imagePath, } = this.props;
    var friendList = friends.map((friend, index) => {
      return(
        <View key={index}>
          <Friend user={user}
                  friend={friend}
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
