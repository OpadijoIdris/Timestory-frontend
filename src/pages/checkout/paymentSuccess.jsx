import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const OrderSuccess = () => {
  const { updateCartCount } = useCart();

  useEffect(() => {
    updateCartCount();
  }, []);

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-2">Order Successful</h1>
      <p className="mb-4">Your order has been successfully placed</p>
      <Link to="/">Continue Shopping</Link>
    </div>
  );
};

export default OrderSuccess;