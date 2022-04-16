import axios from 'axios';

const LIKES_API = 'http://localhost:4000/api/businesses/likes';

export const addLike = async (like) => {
  const response = await axios.post(LIKES_API, like);
  return response.data
}

export const findLike = async (user_id, business_id) => {
  const response = await axios.get(`${LIKES_API}/${user_id}/${business_id}`);
  const likes = response.data;
  return likes;
}

export const findAllLikes = async (business_id) => {
  const response = await axios.get(`${LIKES_API}/${business_id}`);
  const likes = response.data;
  return likes;
}

export const findLikes = async (business_id) => {
  const response = await axios.get(`${LIKES_API}/${business_id}`);
  return response.data;
}

export const findDislikes = async (business_id) => {
  const DISLIKES_API = "http://localhost:4000/api/businesses/dislikes";
  const response = await axios.get(`${DISLIKES_API}/${business_id}`);
  return response.data;
}

export const deleteLike = async (user_id, business_id) => {
  const response = await axios.delete(`${LIKES_API}/${user_id}/${business_id}`);
  return response.data;
}

export const updateLike = async (user_id, business_id, like) => {
  const response = await axios.put(`${LIKES_API}/${user_id}/${business_id}`, {like: like});
  return response.data;
}