import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../utils/axiosInstance';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import '../styles/ProductDetailPage.css';

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/products/${id}`);
        const data = res.data;
        setProduct(data);
        // Nếu có nhiều ảnh, lấy ảnh đầu tiên
        setMainImage(data.images?.length > 0 ? data.images[0] : data.image);
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
        <div className="product-images">
          {/* Ảnh chính */}
          <div className="main-image">
            <img src={mainImage || '/images/default.png'} alt={product.name} />
          </div>

          {/* Nếu có nhiều ảnh */}
          {product.images && product.images.length > 1 && (
            <div className="thumbnail-list">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Hình ${index + 1}`}
                  className={`thumbnail ${mainImage === img ? 'active' : ''}`}
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="product-info">
          <h2>{product.name}</h2>
          <p className="price">{product.price.toLocaleString()}₫</p>
          <p className="category">Loại: {product.category}</p>
          <p className="description">{product.description}</p>

          <div className="product-actions">
            <button className="btn btn-primary" onClick={handleAddToCart}>
              🛒 Thêm vào giỏ
            </button>
            <Link to="/products" className="btn btn-secondary">
              ← Quay lại
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
