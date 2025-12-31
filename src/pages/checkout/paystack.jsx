import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const Paystack = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePayNow = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await api.post("/order/checkout/paystack");

      if (!res.data?.authorization_url) {
        throw new Error("Invalid Paystack response");
      }

      window.location.href = res.data.authorization_url;
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          "Unable to start payment. Please try again."
      );
      setLoading(false);
    }
  };

  return (
    <div className="p-6 text-center max-w-md mx-auto">
      <h1 className="text-xl font-semibold mb-4">
        Pay with Paystack
      </h1>

      {error && (
        <p className="mb-3 text-red-600 text-sm">{error}</p>
      )}

      <button
        onClick={handlePayNow}
        disabled={loading}
        className="w-full bg-black text-white py-3 rounded disabled:opacity-50"
      >
        {loading ? "Redirecting…" : "Pay Now"}
      </button>
    </div>
  );
};

export default Paystack;
