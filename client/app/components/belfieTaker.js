import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Camera from 'react-native-camera';
import { Actions } from 'react-native-router-flux';

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40,
  }
});

export default class BelfieTaker extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => { this.camera = cam; }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}
          captureAudio={false}>
          <Text
            style={styles.capture}
            onPress={this.takePicture.bind(this)}>
            [CAPTURE]
          </Text>
        </Camera>
      </View>
    )
  }

  takePicture() {
    var _this = this;
    this.camera.capture()
      .then((data) => {
        var imagePath = data.path;
        Actions.friendSelector({
          user: _this.props.user,
          imagePath: imagePath,
        });
      })
      .catch(err => console.error(err));
  }
}
