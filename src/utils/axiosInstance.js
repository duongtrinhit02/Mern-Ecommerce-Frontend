import axios from 'axios';

// Nếu đang chạy local (localhost), dùng backend local
// Nếu đang deploy, dùng backend deploy
const baseURL = window.location.hostname === 'localhost'
  ? 'http://localhost:5000/api'
  : 'https://mern-ecommerce-backend-ptjk.onrender.com/api';

console.log("Axios baseURL:", baseURL);

const instance = axios.create({
  baseURL,
  withCredentials: true, // để gửi cookies nếu cần
});

// Gắn token tự động
instance.interceptors.request.use(
  (config) => {
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      try {
        const { token } = JSON.parse(storedAuth);
        if (token) config.headers.Authorization = `Bearer ${token}`;
      } catch (e) {
        console.error('Lỗi khi parse token:', e);
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
