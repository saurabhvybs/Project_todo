import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:1000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Set the Authorization header if a token is present
const token = localStorage.getItem('token');
if (token) {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default axiosInstance;
