import axios from 'axios';
import Cookies from 'js-cookie';

// Create an instance of Axios with base configuration
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Base URL for all API requests
  headers: {
    'Content-Type': 'application/json', // Default content type for requests
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Retrieve token from localStorage
    const token = Cookies.get('token');
    if (token) {
      // Attach the token to the Authorization header if it exists
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config; // Proceed with the request
  },
  (error) => {
    // Handle any errors that occur while setting up the request
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Simply return the response if successful
    return response;
  },
  (error) => {
    // Check if the response status is 401 (Unauthorized)
    if (error.response && error.response.status === 401) {
      // If so, remove the token from localStorage
      localStorage.removeItem('token');
      // Redirect the user to the login page
      window.location.href = '/login';
    }
    // Reject the promise with the error object
    return Promise.reject(error);
  }
);

export default axiosInstance;
