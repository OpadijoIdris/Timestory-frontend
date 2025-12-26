import { Outlet, Link } from "react-router-dom";
import { useState } from "react";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-black text-white p-4 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <h2 className="text-lg font-bold mb-6">Admin</h2>
        <nav className="space-y-3">
          <Link to="/admin" className="block" onClick={() => setSidebarOpen(false)}>Dashboard</Link>
          <Link to="/admin/products" className="block" onClick={() => setSidebarOpen(false)}>Create Product</Link>
          <Link to="/admin/all-products" className="block" onClick={() => setSidebarOpen(false)}>View Products</Link>
          <Link to="/admin/orders" className="block" onClick={() => setSidebarOpen(false)}>Orders</Link>
          <Link to="/admin/create-category" className="block" onClick={() => setSidebarOpen(false)}>Category</Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-50">
        {/* Hamburger button for mobile */}
        <button className="md:hidden mb-4" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
