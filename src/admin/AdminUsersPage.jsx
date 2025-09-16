import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // ✅ Link
import axios from "../utils/axiosInstance";
import { useAuth } from "../context/AuthContext";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      if (!user || !user.isAdmin) {
        navigate("/login");
        return;
      }

      try {
        const { data } = await axios.get("/admin/users"); // token đã tự động gửi
        setUsers(data);
      } catch (error) {
        console.error("❌ Lỗi khi tải danh sách user:", error.response?.data?.message || error.message);
      }
    };

    fetchUsers();
  }, [user, navigate]);

  return (
    <div>
     
    

      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Email</th>
            <th>Quyền</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u._id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.isAdmin ? "Admin" : "User"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
