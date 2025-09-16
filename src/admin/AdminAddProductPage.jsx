import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axiosInstance";
import '../styles/admin/AdminAddProductPage.css'
export default function AdminAddProductPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    brand: "",
    description: "",
    image: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/admin/products", formData);
      navigate("/admin/products");
    } catch (err) {
      setError(err.response?.data?.message || "Lỗi khi thêm sản phẩm");
    }
  };

  return (
    <div>
      <h2>Thêm sản phẩm mới</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Tên sản phẩm" onChange={handleChange} required />
        <input name="price" type="number" placeholder="Giá" onChange={handleChange} required />
        <input name="category" placeholder="Danh mục" onChange={handleChange} />
        <textarea name="description" placeholder="Mô tả" onChange={handleChange}></textarea>
        <input name="image" placeholder="Link ảnh" onChange={handleChange} />
        <button type="submit">Lưu</button>
      </form>
    </div>
  );
}
