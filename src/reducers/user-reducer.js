import {CREATE_USER} from '../actions/user-actions';

const userReducer = (state, action) => {
  switch (action.type) {
    case CREATE_USER:
      return [
        action.user,
        ...state
      ]
    default:
      return [];
  }
}

export default userReducer;