import axios from 'axios';
import {API_KEY, BASE_URL} from '@env';

export const fetchTrendingGIFs = async (offset = 0) => {
  const response = await axios.get(`${BASE_URL}/trending`, {
    params: {api_key: API_KEY, limit: 20, offset},
  });
  return response.data.data;
};

export const searchGIFs = async (query, offset = 0) => {
  const response = await axios.get(`${BASE_URL}/search`, {
    params: {api_key: API_KEY, q: query, limit: 20, offset},
  });
  return response.data.data;
};
