import { useEffect, useState } from 'react';
import axios from '../utils/axiosInstance'; 
import { Link } from 'react-router-dom';
import '../styles/Productspage.css'; 

export default function ProductsPage() {
  const [allProducts, setAllProducts] = useState([]); 
  const [products, setProducts] = useState([]); 
  const [categories, setCategories] = useState([]); // ✅ lưu danh sách categories
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [category, setCategory] = useState(''); // ✅ category filter

  // Lấy products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('/products');
        setAllProducts(res.data);
        setProducts(res.data);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Lấy categories từ backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('/products/categories/list');
        setCategories(res.data);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    };

    fetchCategories();
  }, []);

  // Cập nhật danh sách khi search/sort/category thay đổi
  useEffect(() => {
    let filtered = [...allProducts];

    if (search.trim() !== '') {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== '') {
      filtered = filtered.filter((p) => p.category === category);
    }

    if (sort === 'asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === 'desc') {
      filtered.sort((a, b) => b.price - a.price);
    }

    setProducts(filtered);
  }, [search, sort, category, allProducts]);

  if (loading) return <p>Đang tải sản phẩm...</p>;

  return (
    <div className="products-page">
      <h2>Danh sách sản phẩm</h2>

      {/* Thanh search + sort + filter category */}
      <div className="product-filters">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />

        <select value={sort} onChange={(e) => setSort(e.target.value)} className="sort-select">
          <option value="">Sắp xếp</option>
          <option value="asc">Giá tăng dần</option>
          <option value="desc">Giá giảm dần</option>
        </select>

        <select value={category} onChange={(e) => setCategory(e.target.value)} className="category-select">
          <option value="">Tất cả loại</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="product-grid">
        {products.length === 0 ? (
          <p>Không có sản phẩm nào.</p>
        ) : (
          products.map((product) => (
            <div className="product-card" key={product._id}>
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
              )}
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">
                Giá: {product.price.toLocaleString()}₫
              </p>
              <p className="product-category">Loại: {product.category}</p>
              <Link to={`/products/${product._id}`} className="product-link">
                Xem chi tiết
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
