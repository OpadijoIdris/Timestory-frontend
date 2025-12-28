import { useEffect, useState } from "react";
import ProductList from "../products/ProductList";
import { useAuth } from "../../context/AuthContext";
import { getMyOrders } from "../../api/order.api";

const UserDashboard = () => {
  const { user } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getMyOrders();
        setOrders(res.data || []);
      } catch (err) {
        console.error("Failed to fetch user orders", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Derived stats
  const totalOrders = orders.length;

  const totalSpent = orders.reduce(
    (sum, order) => sum + (order.totalAmount || 0),
    0
  );

  const lastOrderStatus = orders[0]?.orderStatus || "No orders yet";

  return (
    <div>
      {/* WELCOME */}
      <h1 className="text-3xl font-bold mb-2">Welcome, {user?.name}!</h1>
      <p className="text-gray-600 mb-6">
        Track your orders and continue shopping.
      </p>

      {/* DASHBOARD STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-5 rounded shadow">
          <p className="text-gray-500 text-sm">Total Orders</p>
          <h2 className="text-2xl font-bold">
            {loading ? "..." : totalOrders}
          </h2>
        </div>

        <div className="bg-white p-5 rounded shadow">
          <p className="text-gray-500 text-sm">Total Spent</p>
          <h2 className="text-2xl font-bold">
            ₦{loading ? "..." : totalSpent.toLocaleString()}
          </h2>
        </div>

        <div className="bg-white p-5 rounded shadow">
          <p className="text-gray-500 text-sm">Last Order Status</p>
          <h2 className="text-xl font-semibold capitalize">
            {loading ? "..." : lastOrderStatus}
          </h2>
        </div>
      </div>

      {/* PRODUCTS */}
      <ProductList />
    </div>
  );
};

export default UserDashboard;
