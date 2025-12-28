import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyOrders } from "../../api/order.api";

const UserOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try{
                const res = await getMyOrders();
                setOrders(res.data || []);
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchOrders()
    }, []);

    if(loading) return <p>Loading orders...</p>

    return (
            <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>

      {orders.length === 0 ? (
        <p>You have not placed any orders yet.</p>
      ) : (
        <table className="w-full border bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Order</th>
              <th className="p-2 border">Amount</th>
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
                  #{order._id.slice(-6)}
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
                    to={`/user/orders/${order._id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    );
};

export default UserOrders;