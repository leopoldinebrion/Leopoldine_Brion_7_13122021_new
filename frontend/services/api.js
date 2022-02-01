import axios from 'axios';

export default () => {
  return axios.create({
    baseURL:  "http://localhost:4200/api/",

    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    },
  });
};

// const fetchClient = () => {
//   const defaultOptions = {
//     baseURL: "http://localhost:4200/api/",
//     headers: {
//       'Authorization': 'Bearer ' + localStorage.getItem('token'),
//     },
//   };

//   // Create instance
//   const instance = axios.create(defaultOptions);

//   return instance;
// };

// export default fetchClient();
