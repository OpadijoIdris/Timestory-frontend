import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getMyOrderDetails } from "../../api/order.api";
import { useCart } from "../../context/CartContext";

const OrderSuccess = () => {
  const { state } = useLocation(); // optional orderId passed via state
  const { updateCartCount } = useCart();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        if (state?.orderId) {
          const res = await getMyOrderDetails(state.orderId);
          setOrder(res.data);
        }
        await updateCartCount(); // ensures cart count updates
      } catch (err) {
        console.error(err.message || err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [state, updateCartCount]);

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-2">Order Successful</h1>
      {order ? (
        <>
          <p className="mb-4">Your order #{order._id} has been successfully placed.</p>
          <p>Total Amount: ₦{order.totalAmount.toLocaleString()}</p>
        </>
      ) : (
        <p className="mb-4">Your payment was successful.</p>
      )}
      <a
        href="/"
        className="inline-block mt-4 bg-black text-white px-6 py-2 rounded"
      >
        Continue Shopping
      </a>
    </div>
  );
};

export default OrderSuccess;
