import { api } from '../config/api';

// Auth endpoints
export const authAPI = {
  login: (data: { email: string; password: string }) => 
    api.post('/auth/login', data),
  register: (data: { username: string; email: string; password: string }) => 
    api.post('/auth/register', data),
  resetPassword: (email: string) => 
    api.post('/auth/reset-password', { email })
};

// Habits endpoints
export const habitsAPI = {
  getAll: () => api.get('/habits'),
  getById: (id: string) => api.get(`/habits/${id}`),
  create: (data: any) => api.post('/habits', data),
  update: (id: string, data: any) => api.put(`/habits/${id}`, data),
  delete: (id: string) => api.delete(`/habits/${id}`),
  getStats: (id: string) => api.get(`/habits/${id}/stats`)
};

// Content endpoints
export const contentAPI = {
  getAll: () => api.get('/content'),
  getById: (id: string) => api.get(`/content/${id}`),
  create: (data: any) => api.post('/content', data),
  update: (id: string, data: any) => api.put(`/content/${id}`, data),
  delete: (id: string) => api.delete(`/content/${id}`)
};

// Users endpoints
export const usersAPI = {
  getAll: () => api.get('/users'),
  getById: (id: string) => api.get(`/users/${id}`),
  update: (id: string, data: any) => api.put(`/users/${id}`, data),
  delete: (id: string) => api.delete(`/users/${id}`)
};