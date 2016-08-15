import React, { Component } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Navigator,
  StatusBarIOS,
  ActivityIndicatorIOS,
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as friendActions from '../actions/friendActions';

import BelfieTaker from '../components/belfieTaker';
import FriendSelector from '../components/friendSelector';

var styles = StyleSheet.create({
  navBar: {
    backgroundColor: '#BD1550',
  },
  navBarText: {
    fontSize: 16,
    marginVertical: 10,
  },
  navBarTitleText: {
    color: 'white',
    fontWeight: '500',
    marginVertical: 9,
  },
  navBarLeftButton: {
    paddingLeft: 10,
  },
  navBarRightButton: {
    paddingRight: 10,
  },
  navBarButtonText: {
    color: 'white',
  },
});

const NavigationBarRouteMapper = {

  LeftButton: function(route, navigator, index, navState) {
    if (index === 0) {
      return null;
    }

    const previousRoute = navState.routeStack[index - 1];
    return (
      <TouchableOpacity
        onPress={() => navigator.pop()}
        style={styles.navBarLeftButton}>
        <Text style={[styles.navBarText, styles.navBarButtonText]}>
          {previousRoute.title}
        </Text>
      </TouchableOpacity>
    );
  },

  RightButton: function(route, navigator, index, navState) {},

  Title: function(route, navigator, index, navState) {
    return (
      <Text style={[styles.navBarText, styles.navBarTitleText]}>
        {route.title}
      </Text>
    );
  },

};

class Nav extends Component {
  constructor(props) {
    super(props);

    this.closeInfoPanel = this.closeInfoPanel.bind(this);

    this.state = {
      currentRoute: {
        name: 'belfie',
        title: 'belfie',
        index: 0,
      },
    };
  }

  closeInfoPanel() {
    StatusBarIOS.setStyle('light-content');
    this.props.actions.infoPanel.closeInfoPanel();
  }

  render() {
    const loader = (
      <View style={{position: 'absolute', right: 0, left: 0, bottom: 0, top: 0, alignItems: 'center', justifyContent: 'center'}}>
        <View style={{height: 100, width: 100, borderRadius: 10, backgroundColor: 'rgba(0, 0, 0, 0.6)'}}>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicatorIOS size={'large'} animating={true} />
          </View>
        </View>
      </View>
    );

    return (
      <View style={{flex: 1}}>
        <Navigator
          style={{flex: 1}}
          initialRoute={this.state.currentRoute}
          navigationBar={
            <Navigator.NavigationBar
              routeMapper={NavigationBarRouteMapper}
              style={styles.navBar}
            />}
          renderScene={(route, navigator) => {
            switch (route.name) {
              case 'belfie':
                return <BelfieTaker {...this.props} />;
                break;
              default:
                break;
            }}} />
        {loader}
      </View>
    )
  }
}

export default connect(state => ({state}),
  (dispatch) => ({
    actions: {
      friends: bindActionCreators(friendActions, dispatch),
    },
  })
)(Nav);
