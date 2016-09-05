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

import _generateUUID from '../utils/uuid';

export default class belfieUploader extends Component {
  constructor(props) {
    debugger;
    super(props);

    this.setState({
      uploading: false,
      showUploadModal: false,
      uploadProgress: 0,
      uploadTotal: 0,
      uploadWritten: 0,
      uploadStatus: undefined,
    });
  }

  componentDidMount() {
    DeviceEventEmitter.addListener('RNUploaderProgress', (data) => {
      let bytesWritten = data.totalBytesWritten;
      let bytesTotal   = data.totalBytesExpectedToWrite;
      let progress     = data.progress;
      this.setState({ uploadProgress: progress, uploadTotal: bytesTotal, uploadWritten: bytesWritten });
    });
  }

  uploadImage() {
    var path = this.state.imagePath;
    var splitPath = path.split('/');
    var fileName = splitPath[splitPath.length - 1];
    var s3Name = fileName + _generateUUID.toString();

    let files = [
        {
            name: s3Name,
            filename: fileName,
            filepath: path,
            filetype: 'image/png',
        },
    ];
    let options = {
        url: 'http://s3.amazonaws.com/belfie/images/',
        files: files,
        method: 'POST',
        headers: { 'Accept': 'application/json' },
    };

    this.setState({ uploading: true, showUploadModal: true, });
    RNUploader.upload( options, (err, response) => {
        if( err ){
            console.log(err);
            return;
        }

        let status = response.status;
        let responseString = response.data;
        let json = JSON.parse(responseString);

        console.log('Upload complete with status ' + status);
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
          <Text style={{ fontSize: 11, color: 'gray', marginTop: 5, }}>
            {(this.state.uploadWritten / 1024).toFixed(0)}/{(this.state.uploadTotal / 1024).toFixed(0)} KB
          </Text>
          <TouchableOpacity
            style={[styles.button, {marginTop: 5}, ]}
            onPress={this._cancelUpload.bind(this)}>
            <Text>{'Cancel'}</Text>
          </TouchableOpacity>
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
        <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', }}>
        <Image key={_generateUUID}
               source={{ uri: this.state.imagePath, }}
               style={styles.thumbnail} />
        </View>
      </View>
    )
  }
}
