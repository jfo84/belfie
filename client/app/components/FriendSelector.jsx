import React, {
  Component,
  View,
  Text
} from 'react-native';

import FriendList from '../components/FriendList';

export default class FriendSelector extends Component {
  constructor(props) {
    super(props);
  }

  render() {
      const { friends } = this.props;
      const friendList = friends ? <FriendList friends={friends} /> : null;

      return (
        <View style={{flex: 1, flexDirection: 'row', marginTop: 10, marginBottom: 10}}>
          {friendList}
        </View>
      );
    }
}
