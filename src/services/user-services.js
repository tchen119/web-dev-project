import axios from 'axios';

const API_BASE = 'http://localhost:4000';
const USER_SIGNUP_API = API_BASE + '/api/signup';
const USER_LOGIN_API = API_BASE + '/api/signin';
const USER_PROFILE = API_BASE + '/api/profile';
const USER_LOGOUT = API_BASE + '/api/signout';
const USER_FIND_BY_ID = API_BASE + '/api/users';

const api = axios.create({withCredentials: true});

export const createUser = async (user) => {
  const response = await api.post(USER_SIGNUP_API, user);
  return response.data
}

export const findUser = async (user) => {
  const response = await api.post(USER_LOGIN_API, user);
  return response.data
}

export const findUserById = async (user_id) => {
  const response = await api.get(`${USER_FIND_BY_ID}/${user_id}`);
  return response.data
}

export const profile = async (user) => {
  const response = await api.post(USER_PROFILE);
  return response.data;
}

export const logout = async () => {
  const response = await api.post(USER_LOGOUT);
  return response.data;
}