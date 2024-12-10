import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FindingRD from "./pages/FindingRD";
import FindIntern from "./pages/FindIntern";
import FindPartTime from "./pages/FindPartTime";
import Login from "./pages/LoginPage";
import RdDetails from "./pages/RdDetails";
import PartTimeDetails from "./pages/PartTimeDetails";
import InternDetails from "./pages/InternDetails";
import AdminPages from "./pages/AdminPages";
import "./index.css";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/find-dorms" element={<FindingRD />} />
          <Route path="/find-intern" element={<FindIntern />} />
          <Route path="/find-part-time" element={<FindPartTime />} />
          <Route path="/login" element={<Login />} />
          <Route path="/rd-details/:id" element={<RdDetails />} />{" "}
          <Route path="/pt-details/:id" element={<PartTimeDetails />} />
          <Route path="/intern-details/:id" element={<InternDetails />} /> */}
          <Route path="/" element={<AdminPages />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
