import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://project-todo-dovo.onrender.com/api/v1',
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
