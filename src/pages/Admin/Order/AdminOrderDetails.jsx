import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAdminOrderDetails, updateOrderStatus } from "../../../api/order.api";

const AdminOrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusUpdating, setStatusUpdating] = useState(false);
  const [paymentUpdating, setPaymentUpdating] = useState(false);

  const fetchOrder = async () => {
    setLoading(true);
    try {
      const res = await getAdminOrderDetails(id);
      setOrder(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch order details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const handleStatusUpdate = async (newStatus) => {
  setStatusUpdating(true);
  try {
    await updateOrderStatus(id, { orderStatus: newStatus }); // just pass orderStatus
    await fetchOrder();
  } catch (err) {
    console.error(err);
    alert("Failed to update order status");
  } finally {
    setStatusUpdating(false);
  }
};

  const handlePaymentUpdate = async () => {
  setPaymentUpdating(true);
  try {
    await updateOrderStatus(id, { paymentStatus: "paid" }); // for COD
    await fetchOrder();
  } catch (err) {
    console.error(err);
    alert("Failed to update payment status");
  } finally {
    setPaymentUpdating(false);
  }
};

  if (loading) return <p>Loading order details...</p>;
  if (!order) return <p>Order not found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>

      {/* Customer Info */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Customer Info</h2>
        <p><strong>User ID:</strong> {order.user._id}</p>
        <p><strong>Name:</strong> {order.user.name || "N/A"}</p>
        <p><strong>Email:</strong> {order.user.email || "N/A"}</p>
      </div>

      {/* Payment Info */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Payment Info</h2>
        <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
        <p>
          <strong>Payment Status:</strong>{" "}
          <span className={order.paymentStatus === "paid" ? "text-green-600" : "text-red-600"}>
            {order.paymentStatus}
          </span>
        </p>
        {order.paymentMethod === "pay_on_delivery" && order.paymentStatus !== "paid" && (
          <button
            onClick={handlePaymentUpdate}
            disabled={paymentUpdating}
            className="mt-2 px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
          >
            {paymentUpdating ? "Updating..." : "Mark as Paid"}
          </button>
        )}
      </div>

      {/* Order Status */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Order Status</h2>
        <p><strong>Status:</strong> {order.orderStatus}</p>

        {order.orderStatus === "processing" && (
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => handleStatusUpdate("shipped")}
              disabled={statusUpdating}
              className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
            >
              {statusUpdating ? "Updating..." : "Mark as Shipped"}
            </button>
            <button
              onClick={() => handleStatusUpdate("cancelled")}
              disabled={statusUpdating}
              className="px-4 py-2 bg-red-600 text-white rounded disabled:opacity-50"
            >
              {statusUpdating ? "Updating..." : "Cancel Order"}
            </button>
          </div>
        )}

        {order.orderStatus === "shipped" && (
          <button
            onClick={() => handleStatusUpdate("delivered")}
            disabled={statusUpdating}
            className="mt-2 px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
          >
            {statusUpdating ? "Updating..." : "Mark as Delivered"}
          </button>
        )}
      </div>

      {/* Order Items */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Items</h2>
        <table className="w-full text-left border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Product</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Quantity</th>
              <th className="p-2 border">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, index) => (
              <tr key={index}>
                <td className="p-2 border flex items-center gap-2">
                  {item.product.images?.[0] ? (
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="h-12 w-12 object-cover rounded"
                    />
                  ) : (
                    <div className="h-12 w-12 bg-gray-200 flex items-center justify-center text-xs text-gray-500 rounded">
                      No image
                    </div>
                  )}
                  <span>{item.product.name}</span>
                </td>
                <td className="p-2 border">₦{item.price.toLocaleString()}</td>
                <td className="p-2 border">{item.quantity}</td>
                <td className="p-2 border">₦{(item.price * item.quantity).toLocaleString()}</td>
              </tr>

            ))}
          </tbody>
        </table>
      </div>

      {/* Total */}
      <div className="text-right font-bold text-lg">
        Total Amount: ₦{order.totalAmount.toLocaleString()}
      </div>
    </div>
  );
};

export default AdminOrderDetails;
