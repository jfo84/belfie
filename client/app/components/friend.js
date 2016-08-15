import React, { Component } from 'react';
import {
  View,
} from 'react-native';

export default class Friend extends Component {
  constructor(props) {
    super(props);
  }

  render() {
      const { id, name } = this.props;
      return (
        <View style={{flex: 1}}>
          {name}
        </View>
      )
    }
}
