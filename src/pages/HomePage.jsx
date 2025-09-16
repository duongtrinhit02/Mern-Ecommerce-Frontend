import { useNavigate } from "react-router-dom";
import '../styles/HomePage.css';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="homepage">      
      <section className="hero">
        <div className="hero-content">
          <h1>Chào mừng đến với Shop Online</h1>
          <p>Khám phá hàng ngàn sản phẩm chất lượng với giá tốt nhất</p>
          <button onClick={() => navigate("/products")}>Xem sản phẩm</button>
        </div>
      </section>
      <section className="intro">
        <h2>Tại sao chọn chúng tôi?</h2>
        <div className="intro-list">
          <div className="intro-card">
            <h3>Giao hàng nhanh</h3>
            <p>Đơn hàng được giao tận nơi trong 1-3 ngày</p>
          </div>
          <div className="intro-card">
            <h3>Thanh toán an toàn</h3>
            <p>Hỗ trợ nhiều hình thức thanh toán bảo mật</p>
          </div>
          <div className="intro-card">
            <h3>Hỗ trợ 24/7</h3>
            <p>Đội ngũ CSKH luôn sẵn sàng hỗ trợ</p>
          </div>
        </div>
      </section>
    </div>
  );
}
