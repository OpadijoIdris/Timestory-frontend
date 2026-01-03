import { Outlet, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();        // clears cookie + resets user
    navigate("/login");    // redirect to login page
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-black text-white p-4 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <h2 className="text-lg font-bold mb-6">Admin</h2>
        <nav className="space-y-3">
          <Link to="/admin" className="block" onClick={() => setSidebarOpen(false)}>
            Dashboard
          </Link>
          <Link to="/admin/products" className="block" onClick={() => setSidebarOpen(false)}>
            Create Product
          </Link>
          <Link to="/admin/create-category" className="block" onClick={() => setSidebarOpen(false)}>
            Category
          </Link>
          <Link to="/admin/all-products" className="block" onClick={() => setSidebarOpen(false)}>
            View Products
          </Link>
          <Link to="/admin/orders" className="block" onClick={() => setSidebarOpen(false)}>
            Orders
          </Link>
          <Link to="/admin/get-users" className="block" onClick={() => setSidebarOpen(false)}>
            Users
          </Link>
          <Link to="/admin/settings" className="block" onClick={() => setSidebarOpen(false)}>
            Settings
          </Link>
          <Link to="/admin/category-list" className="block" onClick={() => setSidebarOpen(false)}>
            Category List
          </Link>

          {/* Logout just below Settings with extra spacing */}
          <button
            onClick={handleLogout}
            className="block mt-4 w-full text-left py-2 px-4 rounded bg-red-600 hover:bg-red-700 text-white"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-50">
        {/* Hamburger button for mobile */}
        <button
          className="md:hidden mb-4"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;