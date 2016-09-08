import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  DeviceEventEmitter,
  ActivityIndicatorIOS,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';

import { RNUploader } from 'NativeModules';

import numberUtils from '../utils/number';

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    padding: 20,
    paddingTop: 65,
  },
  progressText: {
    fontSize: 11,
    color: 'gray',
    marginTop: 5,
  },
  divider: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  thumbnail: {
    width: 73,
    height: 73,
    borderWidth: 1,
    borderColor: '#DDD',
    margin: 5,
  },
  modal: {
    margin: 50,
    borderWidth: 1,
    borderColor: '#DDD',
    padding: 20,
    borderRadius: 12,
    backgroundColor: 'lightyellow',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 14,
  },
  button: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#EEE',
    marginHorizontal: 5,
  }
});

export default class belfieUploader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uploading: false,
      showUploadModal: false,
      uploadProgress: 0,
      uploadTotal: 0,
      uploadWritten: 0,
      uploadStatus: undefined,
    };
  }

  componentDidMount() {
    DeviceEventEmitter.addListener('RNUploaderProgress', (data) => {
      let bytesWritten = data.totalBytesWritten;
      let bytesTotal   = data.totalBytesExpectedToWrite;
      let progress     = data.progress;
      this.setState({ uploadProgress: progress, uploadTotal: bytesTotal, uploadWritten: bytesWritten });
    });

    this.uploadImage();
  }

  generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
  }

  uploadImage() {
    var { user, imagePath, } = this.props;
    var splitPath = imagePath.split('/');
    var fileName = splitPath[splitPath.length - 1];
    var s3Name = user.id + '-' + this.generateUUID();

    var files = [
        {
            name: s3Name,
            filename: fileName,
            filepath: imagePath,
            filetype: 'image/png',
        },
    ];

    var options = {
        url: 'http://s3.amazonaws.com/belfie/images/',
        files: files,
        method: 'PUT',
        headers: { 'Accept': 'application/json' },
    };

    this.setState({ uploading: true, showUploadModal: true, });
    RNUploader.upload( options, (err, response) => {
        if (err) {
          console.log(err);
          return;
        }

        var status = response.status;
        var statusString = status === 200 ? 'Success!' : 'Failure.'

        console.log('Upload complete with status: ' + statusString);
    });
  }

  uploadProgressModal(){
    let uploadProgress;

    if (!this.state.uploading && this.state.uploadStatus) {
      uploadProgress = (
        <View style={{ margin: 5, alignItems: 'center', }}>
          <Text style={{ marginBottom: 10, }}>
            Upload Complete with Status: {this.state.uploadStatus}
          </Text>
        </View>
      );
    } else if(this.state.uploading) {
      uploadProgress = (
        <View style={{ alignItems: 'center', }}>
          <Text style={styles.title}>Uploading Belfie...</Text>
          <ActivityIndicatorIOS
            animating={this.state.animating}
            style={[styles.centering, {height: 80}]}
            size="large" />
          <Text>{ this.state.uploadProgress.toFixed(0) }%</Text>
          <Text style={styles.progressText}>
            {(this.state.uploadWritten / 1024).toFixed(0)}/{(this.state.uploadTotal / 1024).toFixed(0)} KB
          </Text>
        </View>
      );
    }
    return uploadProgress;
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal
          animated={false}
          transparent={false}
          visible={this.state.showUploadModal}>
          <View style={styles.modal}>
            { this.uploadProgressModal() }
          </View>
        </Modal>
        <View style={styles.divider}>
        <Image key={this.generateUUID()}
               source={{ uri: this.state.imagePath, }}
               style={styles.thumbnail} />
        </View>
      </View>
    )
  }
}
