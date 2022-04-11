import axios from 'axios';

const YELP_API = 'http://localhost:4000/api/search';

export const getBusinessesByTermAndLocation = async (search) => {
  const response = await axios.get(`${YELP_API}/${search.term}/${search.location}`);
  return response.data;
}

export const getBusinessDetails = async (id) => {
  const response = await axios.get(`${YELP_API}/${id}`);
  return response.data;
}