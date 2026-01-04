import { useEffect, useState } from "react";
import { getCart } from "../../api/cart.api";
import { useNavigate } from "react-router-dom";
import { checkoutCOD } from "../../api/order.api";

const Checkout = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await getCart();
        setCart(res.data);
      } catch (err) {
        console.error(err.message || err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handleCOD = async () => {
    try {
      setProcessing(true);
      const res = await checkoutCOD();
      navigate("/order-success", {
        state: { orderId: res.orderId },
      });
    } catch (err) {
      toast.error("Checkout failed");
    } finally {
      setProcessing(false);
    }
  };

  if (loading) return <p className="p-4">Loading...</p>;
  if (!cart || cart.totalItems === 0)
    return <p className="p-4">Your cart is empty</p>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Checkout</h1>

      {/* Order Summary */}
      <div className="space-y-3">
        {cart.items.map(({ product, quantity }) => (
          <div
            key={product._id}
            className="flex justify-between border-b pb-2"
          >
            <span>
              {product.name} × {quantity}
            </span>
            <span>₦{product.price * quantity}</span>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="mt-4 flex justify-between font-semibold text-lg">
        <span>Total</span>
        <span>₦{cart.totalPrice}</span>
      </div>

      {/* Payment Actions */}
      <div className="mt-6 space-y-3">
        <button
          onClick={() => navigate("/paystack")}
          className="w-full bg-black text-white py-3 rounded"
        >
          Pay with Paystack
        </button>

        <button
          onClick={handleCOD}
          disabled={processing}
          className="w-full border py-3 rounded"
        >
          {processing ? "Processing..." : "Pay on Delivery"}
        </button>
      </div>
    </div>
  );
};



export default Checkout;