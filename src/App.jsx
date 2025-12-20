import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Home from "./pages/home";
import Navbar from "./components/layout/NavBar";
import ProtectedRoute from "./routes/ProtectedRoute";
import Cart from "./pages/cart/Cart";
// import ProductList from "./pages/products/ProductList";
// import Checkout from "./pages/checkout/Checkout";
// import Orders from "./pages/orders/Orders";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        {/* <Route
          path="/products"
          element={
            <ProtectedRoute>
              <ProductList />
            </ProtectedRoute>
          }
        /> */}
        {/* <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        /> */}
        {/* <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;