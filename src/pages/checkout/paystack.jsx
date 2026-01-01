import { useEffect } from "react";
import api from "../../api/axios";

const Paystack = () => {
  useEffect(() => {
    const initPayment = async () => {
      try {
        const res = await api.post("/order/checkout/paystack"); // your backend route
        window.location.href = res.data.authorization_url;

    } catch (err) {
        console.error(err);
        alert("Payment initialization failed");
      }
    };

    initPayment();
  }, []);

  return <p className="p-4">Redirecting to Paystack...</p>;
};

export default Paystack;
