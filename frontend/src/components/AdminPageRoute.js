// components/AdminPageRoute.js
import { Navigate } from "react-router-dom";

const AdminPageRoute = ({ element, isAdmin }) => {
  return isAdmin ? element : <Navigate to="/" />; // Admin değilse anasayfaya yönlendir
};

export default AdminPageRoute;
