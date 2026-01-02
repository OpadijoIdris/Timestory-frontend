import { useEffect } from "react";
import api from "../../api/axios";

const Paystack = () => {
  useEffect(() => {
    const initPayment = async () => {
      try {
        // Fetch cart first or pass it down as props
        const cartRes = await api.get("/cart");
        const cart = cartRes.data;

        const res = await api.post("/order/checkout/paystack", {
          userId: cart.userId,       // or from auth context
          cart: {
            items: cart.items,
            totalPrice: cart.totalPrice,
            userEmail: cart.userEmail, // must be included
          },
        });

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