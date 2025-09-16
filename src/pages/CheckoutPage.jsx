import { useEffect, useMemo, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "../utils/axiosInstance";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const { cart, fetchCart } = useCart();
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const orderItems = useMemo(() => {
    return cart.map((item) => {
      const p = item.product || item;
      return {
        product: p._id,
        name: p.name,
        price: Number(p.price || 0),
        qty: Number(item.quantity ?? item.qty ?? 1),
        image: p.image || "",
      };
    });
  }, [cart]);

  const totalPrice = useMemo(
    () => orderItems.reduce((s, i) => s + i.price * i.qty, 0),
    [orderItems]
  );

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const initPayment = async () => {
    try {
      setLoading(true);
      setErrorMsg("");

      if (!orderItems.length) {
        setErrorMsg("Giỏ hàng trống.");
        return;
      }

      const createOrderRes = await axios.post("/orders", {
        orderItems,
        totalPrice,
      });
      const newOrder = createOrderRes.data;
      setOrderId(newOrder._id);

      const createPaymentRes = await axios.post("/payment/create-payment", {
        orderId: newOrder._id,
      });
      setClientSecret(createPaymentRes.data.clientSecret);
    } catch (err) {
      console.error(err);
      setErrorMsg(
        err.response?.data?.message || "Không khởi tạo thanh toán được."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initPayment();
  }, []);

  const handlePay = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    setLoading(true);
    setErrorMsg("");

    try {
      const card = elements.getElement(CardElement);
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        { payment_method: { card } }
      );

      if (error) {
        setErrorMsg(error.message || "Thanh toán thất bại.");
        setLoading(false);
        return;
      }

      if (paymentIntent && paymentIntent.status === "succeeded") {
        await fetchCart(); 
        navigate("/success");
      } else {
        setErrorMsg("Thanh toán chưa hoàn tất.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Có lỗi xảy ra khi xác nhận thanh toán.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 520, margin: "40px auto" }}>
      <h2>Thanh toán</h2>
      <p>
        Tổng tiền: <b>{totalPrice.toLocaleString("vi-VN")} ₫</b>
      </p>

      {errorMsg && (
        <div style={{ background: "#fee", padding: 12, marginBottom: 12 }}>
          {errorMsg}
        </div>
      )}

      {!clientSecret ? (
        <p>Đang khởi tạo thanh toán…</p>
      ) : (
        <form onSubmit={handlePay}>
          <div
            style={{
              padding: 12,
              border: "1px solid #ddd",
              borderRadius: 8,
              marginBottom: 12,
            }}
          >
            <CardElement options={{ hidePostalCode: true }} />
          </div>

          <button type="submit" disabled={!stripe || loading}>
            {loading ? "Đang xử lý..." : "Thanh toán"}
          </button>
        </form>
      )}

      <div style={{ marginTop: 16, fontSize: 14, opacity: 0.8 }}>
        Thẻ test: <code>4242 4242 4242 4242</code> — MM/YY: tương lai, CVC: bất kỳ
      </div>
    </div>
  );
}
