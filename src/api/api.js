import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Ajouter automatiquement le token JWT si présent
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const auth = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  requestReset: (data) => api.post('/auth/request-reset', data),
  resetPassword: (data) => api.post('/auth/reset-password', data),
};

export const courses = {
  getAll: () => api.get('/courses'),
  getOne: (slug) => api.get(`/courses/${slug}`),
  buyLevel: (slug, level) => api.post(`/courses/${slug}/buy/${level}`),
};

export const ads = {
  watched: () => api.post('/ads/watched'),
};

export default api;
