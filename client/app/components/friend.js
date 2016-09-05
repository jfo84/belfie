import React, { Component } from 'react';
import {
  View,
} from 'react-native';

export default class Friend extends Component {
  constructor(props) {
    super(props);
  }

  upload() {
    var { name, path } = this.props;
    Actions.belfieUploader({
      name: name,
      path: path,
    });
  }

  render() {
      const { name } = this.props;
      return (
        <View style={{flex: 1}}>
          <Text onPress={this.upload.bind(this)}>
            {name}
          </Text>
        </View>
      )
    }
}
