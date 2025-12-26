import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Home from "./pages/home";
import Navbar from "./components/layout/NavBar";
import ProtectedRoute from "./routes/ProtectedRoute";
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/checkout/Checkout";
import Paystack from "./pages/checkout/paystack";
import OrderSuccess from "./pages/checkout/paymentSuccess";

// Admin routes below 

import AdminRoute from "./pages/Admin/AdminRoutes";
import AdminLayout from "./pages/Admin/AdminLayout";
import Dashboard from "./pages/Admin/Dashboard";
import CreateProduct from "./pages/Admin/CreateProduct";
import CreateCategory from "./pages/Admin/Categories/CreateCategory";
import AdminProductTable from "./pages/Admin/AdminProductTable";
import ProductDetailPage from "./pages/Admin/ProductDetailPage";
// import Orders


function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />

        <Route
          path="/paystack"
          element={
            <ProtectedRoute>
              <Paystack />
            </ProtectedRoute>
          }
        />

        <Route
          path="/payment-success"
          element={
            <ProtectedRoute>
              <OrderSuccess />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route path="/admin" element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }>
          <Route index element={<Dashboard />} /> {/* /admin */}
          <Route path="products" element={<CreateProduct />} /> {/* /admin/products */}
          <Route path="all-products" element={<AdminProductTable />} /> {/* /admin/all-products */}
          <Route path="products/:id" element={<ProductDetailPage />} /> {/* /admin/products/:id */}
          <Route path="products/edit/:id" element={<CreateProduct />} /> {/* /admin/products/edit/:id */}
          <Route path="create-category"  element={<CreateCategory />} />
          {/* Add other admin routes here */}
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;