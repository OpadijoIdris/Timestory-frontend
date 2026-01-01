import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../../api/axios";
import { useCart } from "../../context/CartContext";

const PaystackCallBack = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { updateCartCount } = useCart();
  const [status, setStatus] = useState("verifying");

  useEffect(() => {
    const reference = searchParams.get("reference");
    if (!reference) {
      navigate("/");
      return;
    }

    let attempts = 0;
    const MAX_ATTEMPTS = 8;

    const verifyPayment = async () => {
      try {
        const res = await api.get(
          `/order/status?reference=${reference}`
        );

        if (res.data.paymentStatus === "paid") {
          await updateCartCount();
          navigate("/order-success", {
            replace: true,
            state: { orderId: res.data.orderId },
          });
          return;
        }

        if (res.data.paymentStatus === "failed") {
          navigate("/checkout?payment=failed", { replace: true });
          return;
        }

        // Still pending → retry
        attempts++;
        if (attempts < MAX_ATTEMPTS) {
          setTimeout(verifyPayment, 2000);
        } else {
          setStatus("failed");
        }
      } catch (err) {
        console.error("Verification error:", err);
        setStatus("failed");
      }
    };

    verifyPayment();
  }, [searchParams, navigate, updateCartCount]);

  if (status === "failed") {
    return (
      <p className="p-4 text-center">
        Payment verification timed out. Please refresh or check your orders.
      </p>
    );
  }

  return <p className="p-4 text-center">Verifying payment...</p>;
};

export default PaystackCallBack;
