// src/pages/AccountPage.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
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
} from "../../services/UserServices";
import ProfileForm from "../Users/ProfileForm"; // ProfileForm componentini import ettik
import AccountForumPosts from "./AccountForumPosts";

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

    // Kullanıcı premium değilse üyelik avantajlarını göster
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <h2 className="text-2xl font-bold mb-4">Go Premium 🚀</h2>
        <p className="text-gray-600 mb-6 text-center">
          Premium üyelik ile daha fazla özellikten yararlanabilirsiniz!
        </p>

        {/* Premium Avantajları Listesi */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6 max-w-md w-full">
          <h3 className="text-lg font-semibold mb-3">
            Premium Üyelik Avantajları
          </h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              <span className="font-bold">Sınırsız ilan ekleme:</span> Normal
              üyeler en fazla 2 ilan ekleyebilir.
            </li>
            <li>
              <span className="font-bold">Daha uzun ilan süresi:</span> Normal
              üyeler için ilan süresi 2 ay, premium üyeler için süresiz.
            </li>
            <li>
              <span className="font-bold">Öne çıkan ilan:</span> Premium
              üyelerin ilanları özel bir bölümde gösterilir.
            </li>
            <li>
              <span className="font-bold">Daha fazla görünürlük:</span>{" "}
              İlanlarınız ana sayfada daha üst sıralarda yer alır.
            </li>
            <li>
              <span className="font-bold">Özel destek:</span> 7/24 müşteri
              desteğine erişim.
            </li>
          </ul>
        </div>

        {/* Premiuma Geçiş Butonu */}
        <button
          onClick={handlePayment}
          className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition font-medium"
        >
          Upgrade to Premium
        </button>
      </div>
    );
  };
  const renderForumPostsContent = () => {
    return <AccountForumPosts />;
  };

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return renderProfileContent();
      case "premium":
        return renderPremiumContent();

      case "forumPosts":
        return renderForumPostsContent();
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
