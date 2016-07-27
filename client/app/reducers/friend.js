import * as types from '../actions/actionTypes';

const initialState = {
  friends: [],
};

export default function search(state = initialState, action = {}) {
  switch (action.type) {
    case types.REQUEST_FRIEND:
      return {
        ...state,
      };
      break
    case types.ACCEPT_FRIEND:
      return {
        ...state,
        accepted: true,
      };
      break;
    case types.REJECT_FRIEND:
      return {
        ...state,
        accepted: false,
      };
      break;
    default:
      return state;
  }
}
