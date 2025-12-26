import { Link } from "react-router-dom";

const Dashboard = () => {
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
    </div>
  );
};

export default Dashboard;