import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAdminOrderDetails, updateOrderStatus } from "../../../api/order.api";

const AdminOrderDetails = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [status, setStatus] = useState("");

    useEffect(() => {
        const fetchOrder = async () => {
            const res = await getAdminOrderDetails(id);
            setOrder(res.data);
            setStatus(res.data.orderStatus);
        }

        fetchOrder();
    }, [id]);

    const handleUpdateStatus = async () => {
        try{
            await updateOrderStatus(id, { orderStatus: status });
            alert("Order updated");
        } catch {
            alert("failed to update order");
        }
    };

    if(!order) return <p>Loading...</p>

    return (
    <div className="bg-white p-6 shadow rounded">
      <h1 className="text-xl font-bold mb-4">Order Details</h1>

      <p><b>Customer:</b> {order.user?.name}</p>
      <p><b>Email:</b> {order.user?.email}</p>
      <p><b>Total:</b> ₦{order.totalAmount.toLocaleString()}</p>
      <p><b>Payment:</b> {order.paymentStatus}</p>

      <div className="mt-4">
        <label className="block mb-1 font-medium">
          Order Status
        </label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <button
          onClick={handleUpdateStatus}
          className="ml-3 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Update
        </button>
      </div>

      <h2 className="mt-6 font-bold">Items</h2>
      <ul className="mt-2 space-y-2">
        {order.items.map((item, i) => (
          <li key={i} className="border p-2 rounded">
            {item.name} × {item.quantity} — ₦
            {item.price.toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );

};

export default AdminOrderDetails;