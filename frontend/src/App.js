import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AdminPageRoute from "./components/AdminPageRoute"; // Admin koruması
import PrivateRoute from "./components/PrivateRoute"; // Giriş koruması

import "./index.css";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FindingRD from "./pages/FindingRD";
import FindIntern from "./pages/FindIntern";
import FindPartTime from "./pages/FindPartTime";
import Login from "./pages/LoginPage";
import AccountPage from "./pages/Users/AccountPage";
import ForumPage from "./pages/ForumPages";
import RoomListingDetails from "./pages/RoomListingDetails";
import DormAdvertForm from "./components/DormAdvertForm";
import DashboardPage from "./pages/AdminPages/DashboardPage";
import PaymentPage from "./pages/Users/PaymentPage";
import PartTimeJobDetails from "./pages/PartTimeJobDetails";
import InternDetails from "./pages/InternDetails";

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split(".")[1]));
        setIsAdmin(decoded.user_type === "admin");
        setIsAuthenticated(true);
      } catch {
        localStorage.removeItem("token");
      }
    }
  }, []);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/find-dorms" element={<FindingRD />} />
          <Route path="/find-intern" element={<FindIntern />} />
          <Route path="/find-part-time" element={<FindPartTime />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dormAdForm" element={<DormAdvertForm />} />

          {/* Admin sayfası */}
          <Route
            path="/admin"
            element={
              <AdminPageRoute element={<DashboardPage />} isAdmin={isAdmin} />
            }
          />

          <Route
            path="/account"
            element={
              <PrivateRoute
                element={<AccountPage />}
                isAuthenticated={isAuthenticated}
              />
            }
          />

          <Route
            path="/payment"
            element={
              <PrivateRoute
                element={<PaymentPage />}
                isAuthenticated={isAuthenticated}
              />
            }
          />

          <Route path="/forumpage" element={<ForumPage />} />
          <Route
            path="/part-time-details/:id"
            element={<PartTimeJobDetails />}
          />
          <Route
            path="/room-listing-details/:id"
            element={<RoomListingDetails />}
          />
          <Route path="/intern-details/:id" element={<InternDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
