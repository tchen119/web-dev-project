import axios from 'axios';

const REVIEWS_API = 'http://localhost:4000/api/businesses/reviews';

export const createReview = async (review) => {
  const response = await axios.post(REVIEWS_API, review);
  return response.data
}

export const findAllReviews = async (business_id) => {
  const response = await axios.get(`${REVIEWS_API}/${business_id}`);
  const reviews = response.data;
  return reviews;
}

export const findAllReviewsByUser = async (user_id) => {
  const API = 'http://localhost:4000/api/users/reviews';
  const response = await axios.get(`${API}/${user_id}`);
  const reviews = response.data;
  return reviews;
}

export const deleteReview = async (id) => {
  const response = await axios.delete(`${REVIEWS_API}/${id}`);
  return response.data;
}

export const updateReview = async (id, review) => {
  const response = await axios.put(`${REVIEWS_API}/${id}`, {review: review});
  return response.data;
}