import React, {
  Component,
  View,
  Text
} from 'react-native';

import Camera from './Camera';

export default class BelfieTaker extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'row', marginTop: 10, marginBottom: 10}}>
        <Camera />
      </View>
    );
  }
}
