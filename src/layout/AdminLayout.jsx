// src/layouts/AdminLayout.jsx
import { Link, Outlet } from "react-router-dom";
import "./AdminLayout.css"; 

export default function AdminLayout() {
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <h2>Admin</h2>
        <nav>
          <ul>
            <li><Link to="/admin/users">Quản lý người dùng</Link></li>
            <li><Link to="/admin/products">Quản lý sản phẩm</Link></li>
           
          </ul>
        </nav>
      </aside>

      <main className="admin-content">
        <Outlet /> {/* Nơi render page con */}
      </main>
    </div>
  );
}
