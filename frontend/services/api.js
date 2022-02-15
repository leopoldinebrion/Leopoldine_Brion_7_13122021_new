import axios from 'axios';

export default () => {
  return axios.create({
    baseURL:  "http://localhost:4200/api/",

    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    },
  });
};
