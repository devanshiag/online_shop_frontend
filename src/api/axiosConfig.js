import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8585/api/v1/customers',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
