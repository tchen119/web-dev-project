import * as service from '../services/user-services';

export const CREATE_USER = 'CREATE_USER';

export const createUser = async (dispatch, user) => {
  const newUser = await service.createUser(user);
  dispatch({
    type: CREATE_USER,
    newUser
  });
}