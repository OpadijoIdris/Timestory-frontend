import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useState } from "react";

const Navbar = () => {
    const { user, logout } = useAuth();
    const { cartCount } = useCart();
    const [open, setOpen] = useState(false);

    return (
        <>
      {/* Top Bar */}
      <header className="sticky top-0 z-50 bg-white border-b">
        <div className="flex items-center justify-between px-4 py-3">

          {/* Logo */}
          <Link to="/" className="text-lg font-bold">
            TimeStory
          </Link>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
  <Link to="/products">Products</Link>

  {/* Cart (Desktop) */}
  <Link to="/cart" className="relative text-lg">
    🛒
    <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
      {cartCount}
    </span>
  </Link>

  {user ? (
    <>
      <span className="text-gray-600">Hi, {user.name}</span>
      <button
        onClick={logout}
        className="bg-black text-white px-3 py-1 rounded"
      >
        Logout
      </button>
    </>
  ) : (
    <>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </>
  )}
</nav>


          {/* Mobile Right Actions */}
          <div className="flex items-center gap-4 md:hidden">
            {/* Cart */}
            <Link to="/cart" className="relative text-xl">
              🛒
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            </Link>

            {/* Hamburger */}
            <button onClick={() => setOpen(true)} className="text-2xl">
              ☰
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/40">
          <div className="fixed top-0 right-0 h-full w-72 bg-white p-5">

            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              className="text-xl mb-6"
            >
              ✕
            </button>

            {/* Links */}
            <nav className="flex flex-col gap-4 text-lg">
              <Link to="/" onClick={() => setOpen(false)}>Home</Link>
              <Link to="/products" onClick={() => setOpen(false)}>Products</Link>
              <Link to="/cart" onClick={() => setOpen(false)}>Cart</Link>

              {user ? (
                <>
                  <span className="text-sm text-gray-500">
                    Logged in as {user.name}
                  </span>
                  <button
                    onClick={() => {
                      logout();
                      setOpen(false);
                    }}
                    className="bg-black text-white py-2 rounded"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setOpen(false)}>Login</Link>
                  <Link to="/register" onClick={() => setOpen(false)}>Register</Link>
                </>
              )}
            </nav>
          </div>
        </div>
      )}
    </>
    )
};

export default Navbar