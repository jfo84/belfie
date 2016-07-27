import React, {
  Component,
  View,
  Text
} from 'react-native';

import Friend from './Friend';

export default class FriendList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
      const { friends } = this.props;
      const friendsList = friends.map(friend => {
        <Friend id={friend.id} name={friend.name} />
      });

      return (
        <View style={{flex: 1}}>
          {friendsList}
        </View>
      );
    }
}
