import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  User,
  Settings,
  Bell,
  Shield,
  Activity,
  CreditCard,
  LogOut,
  Menu,
  Mail,
} from "lucide-react";

const AccountPage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:5000/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => setUser(response.data))
        .catch((error) => {
          setError("Kullanıcı bilgileri alınırken bir hata oluştu!");
          console.error("Hata:", error);
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (error) return <div className="text-red-500">{error}</div>;
  if (!user) return <div className="text-gray-500">Yükleniyor...</div>;

  const menuItems = [
    { id: "profile", label: "Profile", icon: User },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "activity", label: "Activity", icon: Activity },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed md:relative md:translate-x-0 z-30 w-64 h-full bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">Account</h2>
          </div>
          <nav className="flex-1 p-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  className="flex items-center w-full px-4 py-3 text-sm text-gray-600 rounded-lg hover:bg-gray-50"
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.label}
                </button>
              );
            })}
          </nav>
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-sm text-red-600 rounded-lg hover:bg-red-50"
            >
              <LogOut className="w-5 h-5 mr-3" /> Logout
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed md:hidden z-40 m-4 p-2 rounded-lg bg-white shadow-lg border border-gray-200 text-gray-600 hover:text-gray-900"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Main Content */}
      <div className="flex-1 min-w-0 p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white text-2xl font-bold">
              {user.name[0]}
              {user.surname[0]}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {user.name} {user.surname}
              </h1>
              <div className="flex items-center text-gray-500 mt-1">
                <Mail className="w-4 h-4 mr-2" />
                {user.email}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
