import axios from 'axios';

export const getApi = () => {
  return axios.create({
    baseURL: `https://multi-tenant-sass.onrender.com`,
  });
};


