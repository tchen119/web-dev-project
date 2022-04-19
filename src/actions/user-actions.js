import * as service from '../services/user-services';

export const CREATE_USER = 'CREATE_USER';
export const FIND_USER = 'FIND_USER';

export const createUser = async (dispatch, user) => {
  const newUser = await service.createUser(user);
  dispatch({
    type: CREATE_USER,
    newUser
  });
}

export const findUser = async (dispatch, user) => {
  const userToFind = await service.findUser(user);
  dispatch({
    type: FIND_USER,
    userToFind
  });
}