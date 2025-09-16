import { useState } from 'react';
import axios from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';
import { useAuth } from '../context/AuthContext'; // ✅ Custom hook từ context

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ Lấy hàm login từ AuthContext

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await axios.post('/users/login', form);

    if (!res.data || !res.data.user || !res.data.token) {
      throw new Error('Phản hồi không hợp lệ từ máy chủ');
    }

    // ✅ login bây giờ chỉ nhận 1 object { user, token }
    login(res.data);

    alert('Đăng nhập thành công!');

    if (res.data.user.isAdmin) {
      navigate('/admin/users');
    } else {
      navigate('/');
    }

  } catch (err) {
    console.error('Login error:', err);
    alert(err.response?.data?.message || err.message || 'Đăng nhập thất bại');
  } finally {
    setLoading(false);
  }
};



  return (
    <div className="login-wrapper">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Welcome!</h2>

        <div className="input-group">
          <span className="icon">👤</span>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <span className="icon">🔒</span>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <button className="login-button" type="submit" disabled={loading}>
          {loading ? 'Đang đăng nhập...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
