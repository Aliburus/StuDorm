// src/pages/Users/AccountPage.js

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import {
  User,
  Bell,
  Megaphone,
  MessageCircle,
  CreditCard,
  LogOut,
  Menu,
  Mail,
  Star,
} from "lucide-react";
import {
  getUserInfo,
  updateUserProfile,
  logout,
} from "../../services/UserServices";
import ProfileForm from "../Users/ProfileForm";
import AccountForumPosts from "./AccountForumPosts";
import AccountListingsPage from "./AccountListingPage";
import ContactMessagesPage from "./ContactMessages";
import GoPremiumBox from "../../components/Users/GoPremiumBox";

const AccountPage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenAndFetchData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        // Token geçerlilik kontrolü
        const decoded = JSON.parse(atob(token.split(".")[1]));
        const isTokenExpired = decoded.exp * 1000 < Date.now();

        if (isTokenExpired) {
          console.log("Token süresi dolmuş!");
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        // Token geçerli, kullanıcı bilgilerini çek
        const userData = await getUserInfo(token);
        setUser(userData);
        setFormData(userData);
      } catch (err) {
        console.error("Hata:", err);
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    checkTokenAndFetchData();
  }, [navigate]);

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
    if (!token) {
      // Giriş yapılmamışsa login sayfasına gönder
      navigate("/login");
      return;
    }
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

    { id: "messages", label: "Messages", icon: Bell },
    { id: "listings", label: "Listing", icon: Megaphone }, // ← listings eklendi
    { id: "forumPosts", label: "Forum Posts", icon: MessageCircle },
    { id: "premium", label: "Premium", icon: CreditCard },
  ];
  const handlePayment = () => {
    navigate("/payment");
  };

  const renderProfileContent = () => (
    <div className="flex flex-col h-[calc(100vh-12rem)] justify-center">
      <ProfileForm
        user={user}
        formData={formData}
        setFormData={setFormData}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        handleSubmit={handleSubmit}
      />
    </div>
  );

  const renderGoPremiumBox = () => {
    return <GoPremiumBox user={user} onPayment={handlePayment} />;
  };

  const renderPremiumContent = () => {
    if (user?.isPremium) {
      return (
        <div className="flex flex-col items-center justify-center py-8">
          <h2 className="text-2xl font-bold mb-4">Premium Member 🚀</h2>
          <p className="text-gray-600 mb-6 text-center">
            You have 12 months left in your premium membership!
          </p>
        </div>
      );
    }
    return renderGoPremiumBox();
  };

  const renderForumPostsContent = () => {
    return <AccountForumPosts />;
  };

  const renderListingsContent = () => {
    return <AccountListingsPage user={user} />;
  };
  const renderContactMessages = () => {
    return <ContactMessagesPage user={user} />;
  };

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return renderProfileContent();
      case "premium":
        return renderPremiumContent();
      case "forumPosts":
        return renderForumPostsContent();
      case "listings":
        return renderListingsContent();
      case "messages":
        return renderContactMessages();
      default:
        return <div>Content</div>;
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
                        ? "bg-yellow-50 text-yellow-400"
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
        <div className="flex-1 min-w-0 p-8">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center text-white text-2xl font-bold">
                {user.name[0]}
                {user.surname[0]}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                  {user.name} {user.surname}
                  {user.isPremium && (
                    <span title="Premium Üye" className="ml-2 text-yellow-400">
                      <Star
                        className="inline w-6 h-6"
                        fill="#facc15"
                        stroke="#facc15"
                      />
                    </span>
                  )}
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
      </div>
      <Footer />
    </div>
  );
};

export default AccountPage;
