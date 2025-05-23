import { Navigate } from "react-router-dom";

const AdminPageRoute = ({ element, isAdmin }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const decoded = JSON.parse(atob(token.split(".")[1]));
    if (decoded.user_type === "admin") {
      return element;
    }
  } catch (error) {
    localStorage.removeItem("token");
  }

  return <Navigate to="/" />;
};

export default AdminPageRoute;
