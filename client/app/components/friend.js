import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

var styles = StyleSheet.create({
  rowContainer: {
    padding: 10,
  },
  rowName: {
    fontSize: 16,
  },
})

export default class Friend extends Component {
  constructor(props) {
    super(props);
  }

  uploadBelfie() {
    var { name, imagePath, } = this.props;
    Actions.belfieUploader({
      name,
      imagePath,
    });
  }

  render() {
      var { name, } = this.props;

      return (
        <View style={styles.rowContainer}>
          <Text style={styles.rowName}
                onPress={this.uploadBelfie.bind(this)}>
            {name}
          </Text>
        </View>
      )
    }
}
