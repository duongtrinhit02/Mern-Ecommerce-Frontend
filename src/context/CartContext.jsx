import { createContext, useContext, useState, useEffect } from "react";
import axios from "../utils/axiosInstance";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { user, token } = useAuth();

  useEffect(() => {
    if (user && token) {
      fetchCart();
    } else {
      setCart([]);
    }
  }, [user, token]);

  const fetchCart = async () => {
    try {
      const res = await axios.get("/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(res.data);
    } catch (err) {
      console.error("Lỗi lấy giỏ hàng:", err);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      const res = await axios.post(
        "/cart",
        { productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCart(res.data);
    } catch (err) {
      console.error("Lỗi thêm sản phẩm:", err);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const res = await axios.delete(`/cart/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(res.data);
    } catch (err) {
      console.error("Lỗi xóa sản phẩm:", err);
    }
  };

  const updateQty = async (productId, quantity) => {
  try {
    const res = await axios.put(
      "/cart",
      { productId, quantity },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setCart(res.data);
  } catch (err) {
    console.error("Lỗi cập nhật số lượng:", err);
  }
};


  const clearCart = async () => {
    try {
      const res = await axios.delete("/cart/clear", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(res.data); 
    } catch (err) {
      console.error("Lỗi khi clear giỏ hàng trên server:", err);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        fetchCart,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
