import axios from 'axios';
import type { AxiosInstance } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - add auth token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor - comprehensive error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle different error scenarios
    if (error.response) {
      // Server responded with error status
      switch (error.response.status) {
        case 401:
          // Unauthorized - clear auth and redirect to login
          localStorage.removeItem('auth_token');
          localStorage.removeItem('user');
          window.location.href = '/login';
          break;
        case 403:
          // Forbidden - user doesn't have permission
          console.error('Access forbidden: You do not have permission to access this resource');
          break;
        case 404:
          // Not found - resource doesn't exist
          console.error('Resource not found');
          break;
        case 500:
        case 502:
        case 503:
          // Server error - show user-friendly message
          console.error('Server error occurred. Please try again later.');
          break;
        default:
          console.error(`API error: ${error.response.status}`);
      }
    } else if (error.code === 'ECONNABORTED') {
      // Request timeout
      console.error('Request timeout: The server took too long to respond. Please check your internet connection.');
    } else if (!error.response) {
      // Network error or no response
      console.error('Network error: Unable to connect to the server. Please check your internet connection.');
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;
