import axios from 'axios';

export default () => {
  return axios.create({
    baseURL:  "http://localhost:4200/api/",

    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    },
  });
};


/*
const fetchClient = () => {
  const defaultOptions = {
    baseURL: "http://localhost:4200/api/",
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Create instance
  const instance = axios.create(defaultOptions);

  // Set the AUTH token for any request
  instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
    return config;
  });

  return instance;
};

export default fetchClient();

*/