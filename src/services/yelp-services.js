import axios from 'axios';

const YELP_API = 'localhost:4000/api/search';

export const getBusinessesByTermAndLocation = async (search) => {
  const response = await axios.get(`${YELP_API}/${search.term}/${search.location}`);
  const businesses = response.data;
  return businesses;
}