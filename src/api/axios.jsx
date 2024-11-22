import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add response interceptor for error handling
api.interceptors.response.use(
  response => response.data,
  error => {
    const message = error.response?.data?.message || 'An error occurred';
    return Promise.reject(new Error(message));
  }
);

export const dogApi = {
  getAll: () => api.get('/dogs'),
  getOne: (id) => api.get(`/dogs/${id}`),
  create: (data) => api.post('/dogs', data),
  update: (id, data) => api.patch(`/dogs/${id}`, data),
  delete: (id) => api.delete(`/dogs/${id}`)
};

export const bathroomApi = {
  getStats: () => api.get('/bathroom-logs/stats'),
  getAll: () => api.get('/bathroom-logs'),
  create: (data) => api.post('/bathroom-logs', data),
  update: (id, data) => api.patch(`/bathroom-logs/${id}`, data),
  delete: (id) => api.delete(`/bathroom-logs/${id}`)
};

export const feedingApi = {
  getAll: () => api.get('/feeding'),
  create: (data) => api.post('/feeding', data),
  update: (id, data) => api.patch(`/feeding/${id}`, data),
  delete: (id) => api.delete(`/feeding/${id}`)
};
