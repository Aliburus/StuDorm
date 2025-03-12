import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar"; // Navbar componenti import edildi
import Footer from "../../components/Footer"; // Footer componenti import edildi
import {
  User,
  Settings,
  Bell,
  Megaphone,
  Star,
  MessageCircle,
  CreditCard,
  LogOut,
  Menu,
  Mail,
  Save,
} from "lucide-react";

import {
  getUserInfo,
  updateUserProfile,
  logout,
} from "../../services/UserServices"; // Import edilen servisler

const AccountPage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const userData = await getUserInfo(token);
          setUser(userData);
          setFormData(userData);
        } catch (err) {
          setError(err.message);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error.message);
    }
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const updatedUser = await updateUserProfile(formData, token);
        setUser(updatedUser);
        setIsEditing(false);
      } catch (err) {
        setError(err.message);
      }
    }
  };
  if (error) return <div className="text-red-500">{error}</div>;
  if (!user) return <div className="text-gray-500">Yükleniyor...</div>;

  const menuItems = [
    { id: "profile", label: "Profile", icon: User },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "listings", label: "Listing", icon: Megaphone },
    { id: "forumPosts", label: "Forum Posts", icon: MessageCircle },
    { id: "favorites", label: "Favorites", icon: Star },
    { id: "premium", label: "Premium", icon: CreditCard },
  ];
  const handlePayment = () => {
    alert("Payment feature is under development");
  };
  const renderProfileContent = () => (
    <div className="flex flex-col h-[calc(100vh-12rem)] justify-center">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white rounded-xl shadow-sm p-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              disabled={!isEditing}
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              disabled={!isEditing}
              value={formData.surname}
              onChange={(e) =>
                setFormData({ ...formData, surname: e.target.value })
              }
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            disabled={!isEditing}
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 disabled:bg-gray-50 disabled:text-gray-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            disabled={!isEditing}
            value={formData.password || ""}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 disabled:bg-gray-50 disabled:text-gray-500"
            placeholder={isEditing ? "Enter new password" : "••••••••"}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="tel"
            disabled={!isEditing}
            value={formData.phone || ""}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 disabled:bg-gray-50 disabled:text-gray-500"
          />
        </div>

        <div className="flex justify-end space-x-3 pt-6">
          {isEditing ? (
            <>
              <button
                type="button"
                onClick={() => {
                  setFormData(user);
                  setIsEditing(false);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center px-4 py-2 bg-yellow-400 text-white rounded-lg text-sm font-medium hover:bg-yellow-600 transition-colors"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-yellow-400 text-white rounded-lg text-sm font-medium hover:bg-yellow-600 transition-colors"
            >
              Edit Profile
            </button>
          )}
        </div>
      </form>
    </div>
  );
  const renderPremiumContent = () => {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <h2 className="text-2xl font-bold mb-4">Go Premium 🚀</h2>
        <p className="text-gray-600 mb-6 text-center">
          Unlock exclusive features by becoming a premium member!
        </p>

        <button
          onClick={handlePayment}
          className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition"
        >
          Upgrade to Premium
        </button>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return renderProfileContent();
      case "premium":
        return renderPremiumContent();
      default:
        return (
          <div className="text-center text-gray-500 py-8">
            This section is under development
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar */}
        <div
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } fixed md:relative md:translate-x-0 z-30 w-64 min-h-screen bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out`}
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
                    onClick={() => setActiveSection(item.id)}
                    className={`flex items-center w-full px-4 py-3 text-sm rounded-lg ${
                      activeSection === item.id
                        ? "bg-yelloww-50 text-yellow-400"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
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
        <div className="flex-1 min-w-0 p-8 ">
          <div className="max-w-4xl mx-auto  bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center text-white text-2xl font-bold">
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

            {renderContent()}
          </div>
        </div>
      </div>{" "}
      <Footer />
    </div>
  );
};

export default AccountPage;
