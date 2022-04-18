import axios from 'axios';

const USERS_API = 'http://localhost:4000/api/signup';

export const createUser = async (user) => {
  const response = await axios.post(USERS_API, user);
  return response.data
}