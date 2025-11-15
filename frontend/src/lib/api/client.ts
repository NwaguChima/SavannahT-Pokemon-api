import axios from 'axios';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1/';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const message = error.response.data?.message || 'An error occurred';
      return Promise.reject(new Error(message));
    } else if (error.request) {
      return Promise.reject(new Error('No response from server'));
    } else {
      return Promise.reject(error);
    }
  }
);

export default apiClient;
