import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element, isAuthenticated, loading }) => {
  if (loading) return null;
  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
