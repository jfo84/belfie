import * as types from './actionTypes';

function requestFriend(data) {
  return {
    type: types.REQUEST_FRIEND,
    data,
  };
}

function acceptFriend(data) {
  return {
    type: types.ACCEPT_FRIEND,
    data,
  };
}

function rejectFriend(data) {
  return {
    type: types.REJECT_FRIEND,
    data,
  };
}
