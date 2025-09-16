import { useEffect } from "react";
import { useCart } from "../context/CartContext";

export default function SuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", textAlign: "center" }}>
      <h2>✅ Thanh toán thành công!</h2>
      <p>Đơn hàng của bạn đã được ghi nhận. Cảm ơn bạn!</p>
    </div>
  );
}
