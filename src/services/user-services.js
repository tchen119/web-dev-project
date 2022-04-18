import axios from 'axios';

const USER_SIGNUP_API = 'http://localhost:4000/api/signup';
const USER_LOGIN_API = 'http://localhost:4000/api/signin';

export const createUser = async (user) => {
  const response = await axios.post(USER_SIGNUP_API, user);
  return response.data
}

export const findUser = async (user) => {
  const response = await axios.post(USER_LOGIN_API, user);
  return response.data
}