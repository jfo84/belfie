import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';

import login from '../components/login';
import belfieTaker from '../components/belfieTaker';
import friendSelector from '../components/friendSelector';
import belfieUploader from '../components/belfieUploader';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="login" component={login} title="Authorize Belfie through your Facebook account!" initial={true} />
          <Scene key="belfieTaker" component={belfieTaker} title="Take a Belfie!" />
          <Scene key="friendSelector" component={friendSelector} title="Select a Friend!" />
          <Scene key="belfieUploader" component={belfieUploader} title="Belfie Uploading..." />
        </Scene>
      </Router>
    )
  }
}
