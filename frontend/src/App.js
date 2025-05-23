import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AdminPageRoute from "./components/AdminPageRoute";
import PrivateRoute from "./components/PrivateRoute";
import "./index.css";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import TermsConditions from "./pages/TermsConditions";
import UpdateForm from "./pages/UpdateForm";

import Login from "./pages/LoginPage";
import AccountPage from "./pages/Users/AccountPage";
import ForumPage from "./pages/ForumPages";

import DormAdvertForm from "./components/DormAdvertForm";
import DashboardPage from "./pages/AdminPages/DashboardPage";
import PaymentPage from "./pages/Users/PaymentPage";

import FindAll from "./pages/FİndAll";
import ListingDetails from "./pages/ListingDetails";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import UserLogDetails from "./pages/AdminPages/Components/tabs/UserLogDetails";

function App() {
  const [isAdmin, setIsAdmin] = useState(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split(".")[1]));
        return decoded.user_type === "admin";
      } catch (error) {
        localStorage.removeItem("token");
        return false;
      }
    }
    return false;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem("token");
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split(".")[1]));
        if (decoded.user_type === "admin") {
          setIsAdmin(true);
          setIsAuthenticated(true);
        } else {
          setIsAdmin(false);
          setIsAuthenticated(true);
        }
      } catch (error) {
        setIsAdmin(false);
        setIsAuthenticated(false);
        localStorage.removeItem("token");
      }
    }
    setLoading(false);
  }, []);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<TermsConditions />} />

          <Route path="/login" element={<Login />} />
          <Route path="/dormAdForm" element={<DormAdvertForm />} />
          <Route path="/find" element={<FindAll />} />

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
                loading={loading}
              />
            }
          />

          <Route
            path="/payment"
            element={
              <PrivateRoute
                element={<PaymentPage />}
                isAuthenticated={isAuthenticated}
                loading={loading}
              />
            }
          />

          <Route path="/forumpage" element={<ForumPage />} />
          <Route
            path="/listing-details/:type/:id"
            element={<ListingDetails />}
          />
          <Route
            path="/update/:type/:id"
            element={
              <PrivateRoute
                element={<UpdateForm />}
                isAuthenticated={isAuthenticated}
                loading={loading}
              />
            }
          />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/admin/logs/:userId" element={<UserLogDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
