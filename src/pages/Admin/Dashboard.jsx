import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPurchaseSummary } from "../../api/order.api";


const Dashboard = () => {

  const [summary, setSummary] = useState({
    totalRevenue: 0,
    totalOrders: onabort,
    totalItemsSold: 0
  })
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try{
        const res = await getPurchaseSummary();
        setSummary(res.data);
      } catch (err) {
        console.err("Failed to load purchase summary", err)
      } finally {
        setLoading(false);
      }
    }

    fetchSummary();
  }, []);


  return (
    <div>
      <h1 className="text-xl font-bold">Admin Dashboard</h1>
      <nav className="mt-4">
        <ul>
          <li>
            <Link to="/admin/products" className="text-blue-500 hover:underline">Create Product</Link>
          </li>
          {/* Add other admin dashboard links here */}
        </ul>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* TOTAL REVENUE */}
      <div className="bg-white p-6 rounded shadow">
        <p className="text-gray-500 text-sm">Total Revenue</p>
        <h2 className="text-2xl font-bold">
          ₦{summary.totalRevenue.toLocaleString()}
        </h2>
      </div>

      {/* TOTAL ORDERS */}
      <div className="bg-white p-6 rounded shadow">
        <p className="text-gray-500 text-sm">Total Orders</p>
        <h2 className="text-2xl font-bold">
          {summary.totalOrders}
        </h2>
      </div>

      {/* ITEMS SOLD */}
      <div className="bg-white p-6 rounded shadow">
        <p className="text-gray-500 text-sm">Items Sold</p>
        <h2 className="text-2xl font-bold">
          {summary.totalItemsSold}
        </h2>
      </div>
    </div>
      
    </div>
  );
};

export default Dashboard;