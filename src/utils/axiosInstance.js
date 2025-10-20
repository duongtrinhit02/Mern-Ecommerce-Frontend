import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL 
    ? `${import.meta.env.VITE_API_URL}/api`
    : 'http://localhost:5000/api',
});


instance.interceptors.request.use(
  (config) => {
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      try {
        const { token } = JSON.parse(storedAuth);
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (e) {
        console.error('Lỗi khi parse token:', e);
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
