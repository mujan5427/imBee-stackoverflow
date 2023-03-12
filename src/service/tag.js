import axios from 'axios';

export const getTagListAPI = (payload) => {
  return axios.get(`/2.3/tags`, payload);
};