import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPurchaseSummary } from "../../api/order.api";

const Dashboard = () => {
  const [summary, setSummary] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalItemsSold: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await getPurchaseSummary();
        setSummary(res.data);
      } catch (err) {
        console.error("Failed to load purchase summary", err.message || err);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div>
      <h1 className="text-xl font-bold">Admin Dashboard</h1>

      <nav className="mt-4">
        <ul>
          <li>
            <Link
              to="/admin/products"
              className="text-blue-500 hover:underline"
            >
              Create Product
            </Link>
          </li>
        </ul>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="bg-white p-6 rounded shadow">
          <p className="text-gray-500 text-sm">Total Revenue</p>
          <h2 className="text-2xl font-bold">
            ₦{(summary.totalRevenue || 0).toLocaleString()}
          </h2>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <p className="text-gray-500 text-sm">Total Orders</p>
          <h2 className="text-2xl font-bold">
            {summary.totalOrders || 0}
          </h2>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <p className="text-gray-500 text-sm">Items Sold</p>
          <h2 className="text-2xl font-bold">
            {summary.totalItemsSold || 0}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
