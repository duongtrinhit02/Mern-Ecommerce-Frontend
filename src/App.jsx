import { Routes, Route, Outlet } from 'react-router-dom'

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import AdminLayout from "./layout/AdminLayout";
import AdminRoute from './admin/AdminRoute';
import AdminUsersPage from './admin/AdminUsersPage'; 
import AdminProductsPage  from './admin/AdminProductsPage';
import AdminAddProductPage from './admin/AdminAddProductPage';
import CartPage from './pages/CartPage';
import CheckoutPage from "./pages/CheckoutPage";
import SuccessPage from "./pages/SuccessPage";
import CancelPage from "./pages/CancelPage";
import ProfileDetail from './pages/ProfileDetail';

import Header from './components/Header';
import Footer from './components/Footer';

// Public layout (Header + Footer)
function PublicLayout() {
  return (
    <div className="app-wrapper">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      {/* Public routes (dùng PublicLayout) */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/cancel" element={<CancelPage />} />
        <Route path="/profile" element={<ProfileDetail />} />
      </Route>

      {/* Admin routes (không có Header/Footer) */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route path="users" element={<AdminUsersPage />} />
        <Route path="products" element={<AdminProductsPage />} />
        <Route path="products/add" element={<AdminAddProductPage />} />
      </Route>
    </Routes>
  )
}
