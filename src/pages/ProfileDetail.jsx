// src/pages/ProfileDetail.jsx
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import axios from "../utils/axiosInstance";
import "../styles/ProfileDetail.css";

export default function ProfileDetail() {
  const { user, token, login } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    address: user?.address || "",
    avatar: user?.avatar || "",
  });

  if (!user) {
    return <p>Vui lòng đăng nhập để xem thông tin cá nhân.</p>;
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };



const handleSave = async () => {
  try {
    const res = await axios.put(
      "/users/profile",
      { ...form },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // ✅ Cập nhật lại user trong context và localStorage
    login(res.data, token);

    setEditing(false);
    alert("Cập nhật thành công!");
  } catch (err) {
    console.error("Lỗi cập nhật:", err);
    alert("Không thể cập nhật thông tin!");
  }
};


  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-avatar">
          <img
            src={form.avatar || "/images/default-avatar.png"}
            alt="Avatar"
          />
        </div>

        <div className="profile-info">
          {editing ? (
            <>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Họ tên"
              />
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Số điện thoại"
              />
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Địa chỉ"
              />
              <input
                type="text"
                name="avatar"
                value={form.avatar}
                onChange={handleChange}
                placeholder="URL ảnh đại diện"
              />

              <button className="save-btn" onClick={handleSave}>
                Lưu
              </button>
              <button className="cancel-btn" onClick={() => setEditing(false)}>
                Hủy
              </button>
            </>
          ) : (
            <>
              <h2>{user.name}</h2>
              <p><b>Email:</b> {user.email}</p>
              <p><b>Số điện thoại:</b> {user.phone || "Chưa cập nhật"}</p>
              <p><b>Địa chỉ:</b> {user.address || "Chưa cập nhật"}</p>
              <button className="edit-btn" onClick={() => setEditing(true)}>
                Chỉnh sửa
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
