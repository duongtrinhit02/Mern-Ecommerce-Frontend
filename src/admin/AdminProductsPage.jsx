import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../utils/axiosInstance";
import { useAuth } from "../context/AuthContext";
import '../styles/admin/AdminProductsPage.css'

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [editProductId, setEditProductId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});

  const { user } = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/admin/products");
        setProducts(res.data);
      } catch (err) {
        setError("Lỗi khi tải danh sách sản phẩm");
      }
    };
    fetchProducts();
  }, []);

  const handleEditClick = (product) => {
    setEditProductId(product._id);
    setEditedProduct({ ...product }); // clone sản phẩm
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    setEditProductId(null);
    setEditedProduct({});
  };

  const handleSave = async (id) => {
    try {
      await axios.put(`/admin/products/${id}`, editedProduct);
      setProducts((prev) =>
        prev.map((p) => (p._id === id ? { ...p, ...editedProduct } : p))
      );
      setEditProductId(null);
      setEditedProduct({});
    } catch (err) {
      alert("Lỗi khi cập nhật sản phẩm.");
      console.error(err);
    }
  };

  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xoá sản phẩm này?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`/admin/products/${productId}`);
      setProducts((prev) => prev.filter((p) => p._id !== productId));
    } catch (err) {
      alert("Lỗi khi xoá sản phẩm.");
    }
  };

  return (
    <div className="container">
      <h2 style={{ textAlign: "center" }}>Quản lý Sản phẩm</h2>

      <div style={{ marginBottom: "16px", textAlign: "right" }}>
        <Link to="/admin/products/add">
          <button style={{ padding: "8px 12px", background: "green", color: "white" }}>
            ➕ Thêm sản phẩm
          </button>
        </Link>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {products.length === 0 ? (
        <p>Chưa có sản phẩm nào.</p>
      ) : (
        <table border="1" cellPadding="8" cellSpacing="0" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f0f0f0" }}>
              <th>Tên</th>
              <th>Giá</th>
              <th>Danh mục</th>
              
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <td>
                  {editProductId === p._id ? (
                    <input
                      type="text"
                      name="name"
                      value={editedProduct.name}
                      onChange={handleEditChange}
                    />
                  ) : (
                    p.name
                  )}
                </td>
                <td>
                  {editProductId === p._id ? (
                    <input
                      type="number"
                      name="price"
                      value={editedProduct.price}
                      onChange={handleEditChange}
                    />
                  ) : (
                    `${p.price.toLocaleString()}đ`
                  )}
                </td>
                <td>
                  {editProductId === p._id ? (
                    <input
                      type="text"
                      name="category"
                      value={editedProduct.category}
                      onChange={handleEditChange}
                    />
                  ) : (
                    p.category
                  )}
                </td>
               
                <td>
                  {editProductId === p._id ? (
                    <>
                      <button onClick={() => handleSave(p._id)}>💾 Lưu</button>
                      <button onClick={handleCancel}>❌ Huỷ</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEditClick(p)}>✏️ Sửa</button>
                      <button onClick={() => handleDelete(p._id)}>🗑️ Xoá</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
