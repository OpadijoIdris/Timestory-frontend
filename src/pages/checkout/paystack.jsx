import { useRef, useState } from "react";
import api from "../../api/axios";

const Paystack = () => {
  const [loading, setLoading] = useState(false);
  const isPayingRef = useRef(false);

  const initPayment = async () => {
    if (isPayingRef.current) return; 
    isPayingRef.current = true;
    setLoading(true);

    try {
      const res = await api.post("/order/checkout/paystack");

      window.location.href = res.data.authorization_url;
    } catch (err) {
      console.error(err.message || err);
      toast.error("Payment initialization failed");
      isPayingRef.current = false;
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <button
        onClick={initPayment}
        disabled={loading}
        className="rounded-lg bg-indigo-600 px-6 py-3 text-white font-medium
                   hover:bg-indigo-700 transition
                   disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Redirecting..." : "Pay with Paystack"}
      </button>
    </div>
  );
};

export default Paystack;
