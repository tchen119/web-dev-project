import axios from 'axios';
import {API_BASE} from './';
const ADMIN_API = `${API_BASE}/api/admin`;

export const addAdmin = async (admin) => {
  const response = await axios.post(ADMIN_API, admin);
  return response.data;
}

export const findAdmin = async (user_id) => {
  const response = await axios.get(`${ADMIN_API}/${user_id}`);
  return response.data;
}

export const addDeletedReview = async (user_id, review) => {
  const response = await axios.put(`${ADMIN_API}/deletedReview/${user_id}`, review);
  return response.data;
}

export const addUpdatedReview = async (user_id, review) => {
  const response = await axios.put(`${ADMIN_API}/updatedReview/${user_id}`, review);
  return response.data;
}