import axios from 'axios';

export const getQuestionList = (payload) => {
  return axios.get(`/2.3/questions`, payload);
};