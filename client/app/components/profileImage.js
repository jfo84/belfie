import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

import api from '../utils/api';

var styles = StyleSheet.create({
  bottomBump: {
    marginBottom: 15,
  },
});

export default class ProfileImage extends Component {
  propTypes: {
    user: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = { photo: null, };
  }

  componentWillMount() {
    var _this = this;
    debugger;
    api.getProfileImage(this.props.user)
      .then((responseData) => {
        _this.setState({
          photo : {
            url : responseData.data.url,
            height: responseData.data.height,
            width: responseData.data.width,
          },
        });
      })
      .done();
  }

  render() {
    if(this.state.photo == null) return this.renderLoading();
    var photo = this.state.photo;

    return (
      <View style={styles.bottomBump}>
        <Image
          style={photo &&
            { height: photo.height, width: photo.width, }
          }
          source={{uri: photo && photo.url}}
        />
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
