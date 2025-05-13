import { Navigate } from "react-router-dom";

const AdminPageRoute = ({ element, isAdmin }) => {
  return isAdmin ? element : <Navigate to="/" />; // Admin değilse ana sayfaya yönlendir
};

export default AdminPageRoute;
