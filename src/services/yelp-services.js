import axios from 'axios';
import {API_BASE} from './';

const YELP_API = `${API_BASE}/api/search`;

export const getBusinessesByTermAndLocation = async (search) => {
  const response = await axios.get(`${YELP_API}/${search.term}/${search.location}`);
  return response.data;
}

export const getBusinessDetails = async (id) => {
  const response = await axios.get(`${YELP_API}/${id}`);
  return response.data;
}