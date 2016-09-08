import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import { Actions } from 'react-native-router-flux';

var styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  rowName: {
    fontSize: 16,
  },
});

export default class Friend extends Component {
  constructor(props) {
    super(props);
  }

  uploadBelfie() {
    var { user, friend, imagePath, } = this.props;
    Actions.belfieUploader({
      user,
      friend,
      imagePath,
    });
  }

  render() {
      var { friend } = this.props;

      return (
        <View style={styles.container}>
          <Text style={styles.rowName}
                onPress={this.uploadBelfie.bind(this)}>
            {friend.name}
          </Text>
        </View>
      )
    }
}
