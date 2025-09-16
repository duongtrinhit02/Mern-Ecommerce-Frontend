import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../utils/axiosInstance';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext'; 
import '../styles/ProductDetailPage.css';

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { addToCart } = useCart(); 

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error('Không thể tải sản phẩm:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

const handleAddToCart = async () => {
  if (!user) {
    alert("⚠️ Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng");
    return;
  }
  await addToCart(product._id, 1);
  alert(`✅ Đã thêm "${product.name}" vào giỏ hàng!`);
};

  if (loading) return <p>Đang tải chi tiết sản phẩm...</p>;
  if (!product) return <p>Sản phẩm không tồn tại.</p>;

  return (
    <div className="product-detail-container">
      <div className="product-detail">
        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-info">
          <h2>Tên sản phẩm: {product.name}</h2>
          <p>Giá sản phẩm: {product.price.toLocaleString()}₫</p>
          <div className="product-actions">
          <div className="btn-group">
          <button className="btn btn-primary" onClick={handleAddToCart}>
            Add to Cart
          </button>
          <Link to="/products" className="btn btn-secondary">
            Quay lại
          </Link>
        </div>


          </div>
        </div>
      </div>
      
    </div>
  );
}
