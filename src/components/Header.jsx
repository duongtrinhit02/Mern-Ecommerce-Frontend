import { Link, useNavigate } from 'react-router-dom';
import '../index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faBoxOpen,
  faRightToBracket,
  faUserPlus,
  faRightFromBracket,
  faShoppingCart 
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const cartCount = Number(localStorage.getItem('cartCount') || 0);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="main-header">
      <div className="header-container">
        <h1 className="logo">
          <FontAwesomeIcon icon={faBoxOpen} style={{ marginRight: '8px' }} />
          MyShop
        </h1>

        <nav className="nav">
          <Link to="/" data-tooltip="Trang chủ">
            <FontAwesomeIcon icon={faHome} />
          </Link>

          <Link to="/products" data-tooltip="Sản phẩm">
            <FontAwesomeIcon icon={faBoxOpen} />
          </Link>

          <Link to="/cart" data-tooltip="Giỏ hàng" style={{ position: 'relative' }}>
            <FontAwesomeIcon icon={faShoppingCart} />
            {cartCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  background: 'red',
                  color: 'white',
                  borderRadius: '50%',
                  padding: '2px 6px',
                  fontSize: '12px'
                }}
              >
                {cartCount}
              </span>
            )}
          </Link>

         {user ? (
  <>
    <Link
      to="/profile"
      style={{
        fontSize: "18px",
        marginLeft: "10px",
        fontWeight: "bold",
        color: "#fff",
        textDecoration: "none",
      }}
      data-tooltip="Trang cá nhân"
    >
      Xin chào! {user.name || user.email}
    </Link>

    <button
      onClick={handleLogout}
      style={{
        background: "transparent",
        border: "none",
        cursor: "pointer",
        marginLeft: "10px",
        color: "#fff",
      }}
      data-tooltip="Đăng xuất"
    >
      <FontAwesomeIcon icon={faRightFromBracket} />
    </button>
  </>
) : (
  <>
    <Link to="/login" data-tooltip="Đăng nhập">
      <FontAwesomeIcon icon={faRightToBracket} />
    </Link>
    <Link to="/register" data-tooltip="Đăng ký">
      <FontAwesomeIcon icon={faUserPlus} />
    </Link>
  </>
)}

        </nav>
      </div>
    </header>
  );
}
