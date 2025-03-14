import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
import PartTimeAdvertForm from "./components/PartTimeAdvertForm";
import RoomListingDetails from "./pages/RoomListingDetails";
import DormAdvertForm from "./components/DormAdvertForm";
import DashboardPage from "./pages/AdminPages/DashboardPage";
import PaymentPage from "./pages/Users/PaymentPage";
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/parttime" element={<PartTimeAdvertForm />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/find-dorms" element={<FindingRD />} />
          <Route path="/find-intern" element={<FindIntern />} />
          <Route path="/find-part-time" element={<FindPartTime />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dormAdForm" element={<DormAdvertForm />} />
          <Route path="/admin" element={<DashboardPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/forum" element={<ForumPage />} />
          <Route
            path="/room-listing-details"
            element={<RoomListingDetails />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
