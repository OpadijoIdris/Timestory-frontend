import { useEffect, useState } from "react";
import { getMyOrders } from "../../api/order.api";
import { Link } from "react-router-dom";

const UserOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getMyOrders().then(setOrders);

    }, []);

    return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">My Orders</h2>

      {orders.length === 0 && <p>No orders yet</p>}

      {orders.map(order => (
        <Link
          key={order._id}
          to={`/user/orders/${order._id}`}
          className="block border p-3 mb-3 rounded"
        >
          <p>Order #{order._id.slice(-6)}</p>
          <p>Status: {order.paymentStatus}</p>
          <p>Total: ₦{order.totalAmount}</p>
        </Link>
      ))}
    </div>
    );
};

export default UserOrders;