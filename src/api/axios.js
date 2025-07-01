import axios from 'axios';

const api = axios.create({
  baseURL: 'https://bookify-backend-f4c3.onrender.com',
});

// Add JWT token to headers if available
api.interceptors.request.use((config) => {
  const auth = localStorage.getItem('auth');
  if (auth) {
    const { token } = JSON.parse(auth);
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api; 