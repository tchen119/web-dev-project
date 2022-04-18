import {CREATE_USER, FIND_USER} from '../actions/user-actions';

const userReducer = (state, action) => {
  switch (action.type) {
    case CREATE_USER:
      return [
        action.user,
        ...state
      ]
    case FIND_USER:
      return action.user;
    default:
      return [];
  }
}

export default userReducer;