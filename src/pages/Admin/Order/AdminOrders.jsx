import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAdminOrders } from "../../../api/order.api";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const fetchOrders = async (searchValue = "", sortValue = sort, pageValue = page) => {
    setLoading(true);
    try {
      const res = await getAdminOrders({
        search: searchValue,
        sort: sortValue,
        page: pageValue,
        limit,
      });
      setOrders(res.data || []);
      setTotalPages(res.totalPages || 1);
    } catch (err) {
      console.error(err);
      alert("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <p>Loading Orders...</p>;

  return (
    <div className="bg-white shadow rounded p-4">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>

      {/* Search and Sort */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by order ID or customer name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded w-full md:w-1/2"
        />
        <button
          onClick={() => {
            setPage(1);
            fetchOrders(search, sort, 1);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Search
        </button>

        <select
          value={sort}
          onChange={(e) => {
            setSort(e.target.value);
            fetchOrders(search, e.target.value, 1);
            setPage(1);
          }}
          className="border px-3 py-2 rounded w-full md:w-1/4"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="total-asc">Total ↑</option>
          <option value="total-desc">Total ↓</option>
          <option value="status">Status</option>
        </select>
      </div>

      {/* Orders Table */}
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
              <td className="p-2 border text-xs">{order._id.slice(-6)}</td>
              <td className="p-2 border">{order.user?.name || "Guest"}</td>
              <td className="p-2 border">₦{order.totalAmount.toLocaleString()}</td>
              <td className="p-2 border capitalize">{order.paymentStatus}</td>
              <td className="p-2 border capitalize">{order.orderStatus}</td>
              <td className="p-2 border">{new Date(order.createdAt).toLocaleDateString()}</td>
              <td className="p-2 border">
                <Link to={`/admin/orders/${order._id}`} className="text-blue-600">View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          disabled={page === 1}
          onClick={() => {
            setPage((p) => p - 1);
            fetchOrders(search, sort, page - 1);
          }}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span className="text-sm">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => {
            setPage((p) => p + 1);
            fetchOrders(search, sort, page + 1);
          }}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminOrders;
