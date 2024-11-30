//src/services/axiosInstance.js
import axios from 'axios';
import { apiUrl } from '../config/envConfig';

// Create an instance of axios with default configurations
const axiosInstance = axios.create({
  baseURL: apiUrl || 'http://localhost:5000/api', // Default base URL
  headers: {
    'Content-Type': 'application/json', // Default headers
  },
  withCredentials: true, // Allow sending cookies from the browser (optional, if needed)
});

export default axiosInstance;
