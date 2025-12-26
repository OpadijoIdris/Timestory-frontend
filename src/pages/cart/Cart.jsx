import { useEffect, useState } from "react";
import { getCart, removeFromCart } from "../../api/cart.api";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState({
    items: [],
    total: 0,
  });
  const [loading, setLoading] = useState(true);
  const { updateCartCount } = useCart();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await getCart();
        setCart(res.cart || res.data || res);
      } catch (err) {
        console.error("Cart fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handleRemove = async (id) => {
    await removeFromCart(id);

    setCart((prev) => ({
      ...prev,
      items: prev.items.filter(
        (i) => i.product._id !== id
      ),
    }));

    updateCartCount();
  };

  if (loading) return <p className="p-4">Loading...</p>;

  if (!cart.items || cart.items.length === 0) {
    return <p className="p-4">Your cart is empty</p>;
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Your Cart</h1>

      <div className="space-y-4">
        {cart.items.map(({ product, quantity }) => (
          <div
            key={product._id}
            className="flex gap-4 border p-3 rounded"
          >
            <img
              src={product.images?.[0] || "/placeholder.png"}
              alt={product.name}
              className="w-20 h-20 object-cover rounded"
            />

            <div className="flex-1">
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-sm text-gray-600">
                ₦{product.price}
              </p>
              <p className="text-sm">Qty: {quantity}</p>
            </div>

            <button
              onClick={() => handleRemove(product._id)}
              className="text-red-500 text-sm"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 border-t pt-4 flex justify-between font-semibold">
        <span>Total</span>
        <span>₦{cart.totalPrice}</span>
        
      </div>
      <Link
          to="/checkout"
          className="block mt-4 bg-black text-white text-center py-3 rounded"
        >
          Proceed to Checkout
      </Link>
    </div>
  );
};

export default Cart;
