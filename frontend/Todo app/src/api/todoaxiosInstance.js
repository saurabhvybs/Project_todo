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

export default todoAxiosInstance;
