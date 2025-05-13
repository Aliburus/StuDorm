import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AdminPageRoute from "./components/AdminPageRoute";
import PrivateRoute from "./components/PrivateRoute";
import "./index.css";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import Contact from "./pages/Contact";

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

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token:", token); // Token'ı konsola yazdırın

    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split(".")[1]));
        console.log("Decoded JWT:", decoded); // Token içeriğini konsola yazdırın
        setIsAdmin(decoded.user_type === "admin"); // Admin kontrolü
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Token decode hatası:", error);
        localStorage.removeItem("token");
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false); // Token yoksa authenticated değil
    }
  }, []);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

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
            path="/listing-details/:type/:id"
            element={<ListingDetails />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
