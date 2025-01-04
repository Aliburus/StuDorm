import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Bars3Icon } from "@heroicons/react/24/outline"; // Updated to v2

const AccountPage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate(); // Hook to navigate programmatically

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get("http://localhost:5000/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          setError("Kullanıcı bilgileri alınırken bir hata oluştu!");
          console.error("Hata:", error);
        });
    }
  }, []);

  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem("token");

    // Redirect the user to the login page
    navigate("/login");
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!user) {
    return <div className="text-gray-500">Yükleniyor...</div>;
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "block" : "hidden"
        } md:block w-64 bg-gray-800 text-white p-4 transition-all duration-300 ease-in-out`}
      >
        <h2 className="text-xl font-semibold mb-6">Account</h2>
        <ul>
          <li className="py-2 hover:bg-gray-700 cursor-pointer">Profile</li>
          <li className="py-2 hover:bg-gray-700 cursor-pointer">Settings</li>
          <li className="py-2 hover:bg-gray-700 cursor-pointer">
            Notifications
          </li>
          <li
            className="py-2 hover:bg-gray-700 cursor-pointer"
            onClick={handleLogout} // Trigger logout on click
          >
            Logout
          </li>
        </ul>
      </div>

      {/* Hamburger Menu for Mobile */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden p-4 bg-gray-800 text-white rounded-full fixed top-4 left-4"
      >
        <Bars3Icon className="h-6 w-6" /> {/* Updated to v2 */}
      </button>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Merhaba, {user.name} {user.surname}
        </h1>
        <p className="text-lg text-gray-700">Email: {user.email}</p>
      </div>
    </div>
  );
};

export default AccountPage;
