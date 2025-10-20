import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import '../styles/CartPage.css';

export default function CartPage() {
  const { cart, removeFromCart, updateQty } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <h2 className="cart-title">Giỏ Hàng </h2>
      {cart.length === 0 && <p className="cart-empty">Giỏ hàng dáng trống</p>}

      {cart.map((item) => (
        <div key={item.product._id} className="cart-item">
          <div className="cart-item-info">
            <h4 className="cart-item-name">{item.product.name}</h4>
            <p className="cart-item-price">
              {item.product.price.toLocaleString("vi-VN")} ₫
            </p>
          </div>
          <input
            type="number"
            className="cart-item-qty"
            value={item.quantity}
            min="1"
            onChange={(e) =>
              updateQty(item.product._id, Number(e.target.value))
            }
          />
          <button
            className="cart-item-remove"
            onClick={() => removeFromCart(item.product._id)}
          >
            Remove
          </button>
        </div>
      ))}

      <h3 className="cart-total">
        Tổng tiền: {total.toLocaleString("vi-VN")} ₫
      </h3>
      <button
        onClick={() => navigate("/checkout")}
        disabled={cart.length === 0}
        className="checkout-btn"
      >
        Đi tới thanh toán
      </button>
    </div>
  );
}
