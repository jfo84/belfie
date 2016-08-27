import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';

import belfieTaker from '../components/belfieTaker';
import friendSelector from '../components/friendSelector';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="belfieTaker" component={belfieTaker} title="belfieTaker" initial={true} />
          <Scene key="friendSelector" component={friendSelector} title="friendSelector" />
        </Scene>
      </Router>
    )
  }
}
