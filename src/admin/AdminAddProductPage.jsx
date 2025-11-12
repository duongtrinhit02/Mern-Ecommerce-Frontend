import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axiosInstance";
import "../styles/admin/AdminAddProductPage.css";

export default function AdminAddProductPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    images: [""], // hỗ trợ nhiều ảnh
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({ ...formData, images: newImages });
  };

  const addImageField = () => {
    setFormData({ ...formData, images: [...formData.images, ""] });
  };

  const removeImageField = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
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
    <div className="add-product-container">
      <h2>🛍️ Thêm sản phẩm mới</h2>
      {error && <p className="error-msg">{error}</p>}

      <form onSubmit={handleSubmit} className="add-product-form">
        <input
          name="name"
          placeholder="Tên sản phẩm"
          onChange={handleChange}
          required
        />
        <input
          name="price"
          type="number"
          placeholder="Giá (₫)"
          onChange={handleChange}
          required
        />
        <input
          name="category"
          placeholder="Danh mục (VD: Điện thoại, Laptop...)"
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Mô tả sản phẩm..."
          onChange={handleChange}
        ></textarea>

        <div className="image-list">
          <h4>Ảnh sản phẩm:</h4>
          {formData.images.map((img, index) => (
            <div key={index} className="image-field">
              <input
                type="text"
                placeholder={`Link ảnh ${index + 1}`}
                value={img}
                onChange={(e) => handleImageChange(index, e.target.value)}
              />
              {img && <img src={img} alt="preview" className="preview-image" />}
              {formData.images.length > 1 && (
                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => removeImageField(index)}
                >
                  ❌
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={addImageField} className="add-btn">
            ➕ Thêm ảnh
          </button>
        </div>

        <button type="submit" className="submit-btn">
          ✅ Lưu sản phẩm
        </button>
      </form>
    </div>
  );
}
