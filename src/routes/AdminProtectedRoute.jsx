import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
      // Optionally render a loader while authentication state is being determined
      return <p>Loading...</p>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (user.role !== "admin") {
        return <Navigate to="/" replace />; // Redirect to home or an unauthorized page
    }

    return children;
};

export default AdminProtectedRoute;
