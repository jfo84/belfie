import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import Camera from './camera';

var styles = StyleSheet.create({
  belfieTaker: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
  },
});

export default class BelfieTaker extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.belfieTaker}>
        <Camera />
      </View>
    )
  }
}
