import axios from 'axios';

const todoAxiosInstance = axios.create({
  baseURL: 'http://localhost:1000/api/v2',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
todoAxiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Add a response interceptor
todoAxiosInstance.interceptors.response.use(
  (response) => {
    console.log('Response Data:', response.data); // Log the response data here
    return response; // Return the response for further handling
  },
  (error) => {
    console.error('Response Error:', error.response ? error.response.data : error.message); // Log the error
    return Promise.reject(error);
  }
);

export default todoAxiosInstance;
