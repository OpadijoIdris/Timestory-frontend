import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const UserLayout = () => {
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = async () => {
    await logout();       
    navigate("/login");    
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside
        className={`bg-gray-800 text-white w-64 min-h-screen p-4 fixed md:static transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-30`}
      >
        <div className="mb-8">
          <h2 className="text-2xl font-bold">Welcome, {user?.name}</h2>
          <p className="text-sm text-gray-400">{user?.email}</p>
        </div>
        <nav>
          <ul>
            <li>
              <NavLink
                to="/user"
                end
                className={({ isActive }) =>
                  `block py-2 px-4 rounded ${
                    isActive ? "bg-gray-700" : "hover:bg-gray-700"
                  }`
                }
                onClick={() => isSidebarOpen && toggleSidebar()}
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/user/orders"
                className={({ isActive }) =>
                  `block py-2 px-4 rounded ${
                    isActive ? "bg-gray-700" : "hover:bg-gray-700"
                  }`
                }
                onClick={() => isSidebarOpen && toggleSidebar()}
              >
                My Orders
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/user/settings"
                className={({ isActive }) =>
                  `block py-2 px-4 rounded ${
                    isActive ? "bg-gray-700" : "hover:bg-gray-700"
                  }`
                }
                onClick={() => isSidebarOpen && toggleSidebar()}
              >
                Settings
              </NavLink>
            </li>

            {/* Logout just below Settings with extra spacing */}
            <li className="mt-4">
              <button
                onClick={handleLogout}
                className="w-full text-left py-2 px-4 rounded bg-red-600 hover:bg-red-700 text-white"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>


      {/* Main Content */}
      <main className="flex-1 md:ml-0">
        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden p-4 bg-gray-800 text-white">
          <button onClick={toggleSidebar}>
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
        </div>

        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default UserLayout;