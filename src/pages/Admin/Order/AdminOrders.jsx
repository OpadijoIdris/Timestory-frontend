import { useEffect, useState } from "react";
import { getAdminOrders } from "../../../api/order.api";
import { Link } from "react-router-dom";

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try{
            const res = await getAdminOrders();
            setOrders(res.data || []);
        } catch (err) {
            console.error(err);
            alert("Failed to load orders");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    if(loading) return <p>Loading Orders...</p>

    return (
    <div className="bg-white shadow rounded p-4">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Order ID</th>
            <th className="p-2 border">Customer</th>
            <th className="p-2 border">Total</th>
            <th className="p-2 border">Payment</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="hover:bg-gray-50">
              <td className="p-2 border text-xs">
                {order._id.slice(-6)}
              </td>
              <td className="p-2 border">
                {order.user?.name || "Guest"}
              </td>
              <td className="p-2 border">
                ₦{order.totalAmount.toLocaleString()}
              </td>
              <td className="p-2 border capitalize">
                {order.paymentStatus}
              </td>
              <td className="p-2 border capitalize">
                {order.orderStatus}
              </td>
              <td className="p-2 border">
                {new Date(order.createdAt).toLocaleDateString()}
              </td>
              <td className="p-2 border">
                <Link
                  to={`/admin/orders/${order._id}`}
                  className="text-blue-600"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders;