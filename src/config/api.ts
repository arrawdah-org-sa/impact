import axios from 'axios';
import { AuthError } from '../types/auth';

const API_URL = 'https://impact-server.up.railway.app/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token and trigger logout
      localStorage.removeItem('token');
      window.dispatchEvent(new CustomEvent('auth:logout'));
      
      throw new AuthError('انتهت صلاحية الجلسة. الرجاء تسجيل الدخول مرة أخرى.');
    }
    return Promise.reject(error);
  }
);