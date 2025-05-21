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
function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      console.log("Token kontrol ediliyor:", token);
      const isLoginPage = window.location.pathname === "/login";

      if (token) {
        try {
          const decoded = JSON.parse(atob(token.split(".")[1]));
          const isTokenExpired = decoded.exp * 1000 < Date.now();

          if (isTokenExpired) {
            console.log("Token süresi dolmuş.");
            localStorage.removeItem("token");
            setIsAuthenticated(false);
            setIsAdmin(false);
            if (!isLoginPage) {
              alert("Oturumunuz sona erdi, lütfen tekrar giriş yapın.");
              window.location.href = "/login";
            }
          } else {
            setIsAdmin(decoded.user_type === "admin");
            setIsAuthenticated(true);
          }
        } catch (error) {
          console.error("Token decode hatası:", error);
          localStorage.removeItem("token");
          setIsAuthenticated(false);
          setIsAdmin(false);
          if (!isLoginPage) {
            alert("Oturum doğrulama hatası, lütfen tekrar giriş yapın.");
            window.location.href = "/login";
          }
        }
      } else {
        setIsAuthenticated(false);
        setIsAdmin(false);
      }
      setLoading(false);
    };

    checkAuth();

    // Sayfalar arası geçişlerde her zaman token kontrolü yap
    window.addEventListener("focus", checkAuth);

    return () => {
      window.removeEventListener("focus", checkAuth);
    };
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
