import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast"
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Home from "./pages/home";
import Navbar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";
import ProtectedRoute from "./routes/ProtectedRoute";
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/checkout/Checkout";
import Paystack from "./pages/checkout/paystack";
import PaystackCallBack from "./pages/checkout/PaystackCallback";
import OrderSuccess from "./pages/checkout/paymentSuccess";
import PaymentError from "./pages/checkout/paymentError";
import VerifyEmail from "./pages/auth/VerifyEmail";
import Settings from "./pages/auth/Settings";
import ForgotPassword from "./pages/auth/ForgetPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import CategoryList from "./pages/Admin/Categories/CategoryList";
import CodOrderSuccess from "./pages/checkout/CodOrderSuccess";

// User routes below;
import UserLayout from "./pages/User/UserLayout";
import UserOrders from "./pages/User/UserOrders";
import UserOrderDetails from "./pages/User/UserOrderDetails";
import UserDashboard from "./pages/User/UserDashboard";
import ProductList from "./pages/products/ProductList";

// Admin routes below 
import AdminRoute from "./pages/Admin/AdminRoutes";
import AdminLayout from "./pages/Admin/AdminLayout";
import Dashboard from "./pages/Admin/Dashboard";
import CreateProduct from "./pages/Admin/CreateProduct";
import CreateCategory from "./pages/Admin/Categories/CreateCategory";
import AdminProductTable from "./pages/Admin/AdminProductTable";
import ProductDetailPage from "./pages/Admin/ProductDetailPage";
import AdminOrders from "./pages/Admin/Order/AdminOrders";
import AdminOrderDetails from "./pages/Admin/Order/AdminOrderDetails";
import AdminUsers from "./pages/Admin/Users/AdminUsers";
// import Orders


function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />


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
              <Paystack />
          }
        />

        <Route 
          path="/paystack/callback"
          element={
              <PaystackCallBack />
          }
        />

        <Route
          path="/payment-success"
          element={
              <OrderSuccess /> 
          }
        />
        <Route
          path="/order-success" 
          element={<CodOrderSuccess />} 
        />
        <Route 
          path="/payment-error" 
          element={<PaymentError />} 
        />


        {/* User Routes */}
        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <UserLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<UserDashboard />} />
          <Route path="orders" element={<UserOrders />} />
          <Route path="orders/:id" element={<UserOrderDetails />} />
          <Route path="settings" element={<Settings />} />
        </Route>

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
          <Route path="orders" element={<AdminOrders />} />
          <Route path="orders/:id" element={<AdminOrderDetails />} />
          <Route path="get-users" element={<AdminUsers />} />
          <Route path="settings" element={<Settings />} />
          <Route path="category-list" element={<CategoryList />} />

          {/* Add other admin routes here */}
        </Route>

      </Routes>
      <Toaster position="top-right" />
      <Footer />
    </BrowserRouter>
  );
}

export default App;