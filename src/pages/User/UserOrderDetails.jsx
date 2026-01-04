import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMyOrderDetails } from "../../api/order.api";

const UserOrderDetails = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            try{
                const res = await getMyOrderDetails(id);
                setOrder(res.data);
            } catch (err) {
                console.error(err.message || err)
            } finally {
                setLoading(false);
            }
        }
        
        fetchOrder();
    }, []);
    if(loading) return <p>Loading order...</p>;
    if(!order) return <p>Order not found</p>;

    return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>

      {/* ORDER INFO */}
      <div className="mb-6">
        <p><strong>Order ID:</strong> #{order._id}</p>
        <p><strong>Payment:</strong> {order.paymentMethod}</p>
        <p><strong>Payment Status:</strong> {order.paymentStatus}</p>
        <p><strong>Order Status:</strong> {order.orderStatus}</p>
      </div>

      {/* ITEMS */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Items</h2>
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Product</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Qty</th>
              <th className="p-2 border">Subtotal</th>
            </tr>
          </thead>

          <tbody>
            {order.items.map((item, idx) => (
              <tr key={idx}>
                <td className="p-2 border flex items-center gap-2">
                  {item.product?.images?.[0] && (
                    <img
                      src={item.product.images[0]}
                      alt={item.name}
                      className="h-12 w-12 object-cover rounded"
                    />
                  )}
                  {item.name}
                </td>
                <td className="p-2 border">
                  ₦{item.price.toLocaleString()}
                </td>
                <td className="p-2 border">{item.quantity}</td>
                <td className="p-2 border">
                  ₦{(item.price * item.quantity).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-right font-bold text-lg">
        Total: ₦{order.totalAmount.toLocaleString()}
      </div>
    </div>
    )
};

export default UserOrderDetails;