import React, { useState } from "react";

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState("personalInfo");

  // User data
  const user = {
    name: "Ahmet",
    surname: "Yılmaz",
    email: "ahmet@example.com",
    phone: "123-456-7890",
    role: "Admin",
    password: "********",
    profilePic: "https://via.placeholder.com/150", // Placeholder for profile picture
  };

  // Ads data
  const ads = [
    {
      id: 1,
      title: "Roommate Needed",
      description:
        "Looking for a roommate in Istanbul. Must be clean and quiet.",
    },
    {
      id: 2,
      title: "Rent a Room",
      description: "Available room in a shared apartment in Kadıköy.",
    },
  ];

  // Comments data (example)
  const comments = [
    { id: 1, text: "This is a great place to stay!" },
    { id: 2, text: "I highly recommend this roommate!" },
  ];

  const handleUpdateInfo = () => {
    alert("Kişisel Bilgiler Güncellendi!");
  };

  const handleDeleteAd = (adId) => {
    alert("İlan Silindi");
  };

  const handleEditAd = (adId) => {
    alert("İlan Düzenleme Sayfasına Yönlendiriliyor...");
  };

  const handleDeleteComment = (commentId) => {
    alert("Yorum Silindi");
  };

  const handleEditComment = (commentId) => {
    alert("Yorum Düzenleme Sayfasına Yönlendiriliyor...");
  };

  const handlePremiumInfo = () => {
    setActiveTab("premium");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 lg:w-1/5 bg-gray-600 text-white p-6 rounded-lg shadow-lg m-6">
        <div className="profile-info p-6 rounded-lg mb-6">
          <div className="flex items-center mb-6">
            <img
              src={user.profilePic}
              alt="Profile"
              className="w-24 h-24 rounded-full mr-6"
            />
            <div>
              <h2 className="text-2xl font-semibold text-white mb-2">
                {user.name} {user.surname}
              </h2>
            </div>
          </div>
        </div>
        <h2 className="text-2xl font-semibold mb-6">Hesap Menüsü</h2>
        <ul className="space-y-4">
          <li>
            <button
              className={`w-full text-left px-4 py-2 rounded hover:bg-gray-400 ${
                activeTab === "personalInfo"
                  ? "bg-gray-500 text-white"
                  : "bg-gray-300"
              }`}
              onClick={() => setActiveTab("personalInfo")}
            >
              Kişisel Bilgilerim
              {activeTab === "personalInfo" && (
                <span className="ml-2 text-sm text-white">•</span> // Dot instead of arrow
              )}
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left px-4 py-2 rounded hover:bg-gray-400 ${
                activeTab === "ads" ? "bg-gray-500 text-white" : "bg-gray-300"
              }`}
              onClick={() => setActiveTab("ads")}
            >
              İlanlarım
              {activeTab === "ads" && (
                <span className="ml-2 text-sm text-white">•</span>
              )}
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left px-4 py-2 rounded hover:bg-gray-400 ${
                activeTab === "comments"
                  ? "bg-gray-500 text-white"
                  : "bg-gray-300"
              }`}
              onClick={() => setActiveTab("comments")}
            >
              Yorumlarım
              {activeTab === "comments" && (
                <span className="ml-2 text-sm text-white">•</span> // Dot instead of arrow
              )}
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left px-4 py-2 rounded hover:bg-yellow-600 ${
                activeTab === "premium"
                  ? "bg-yellow-700 text-white"
                  : "bg-yellow-500"
              }`}
              onClick={handlePremiumInfo}
            >
              Premium Üyelik
              {activeTab === "premium" && (
                <span className="ml-2 text-sm text-white">•</span>
              )}
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-3/4 lg:w-4/5 ml-6 space-y-6 p-6 overflow-y-auto h-full">
        {activeTab === "personalInfo" && (
          <div className="profile-info bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <div className="flex items-center mb-6">
              <img
                src={user.profilePic}
                alt="Profile"
                className="w-24 h-24 rounded-full mr-6"
              />
              <div>
                <h2 className="text-3xl font-semibold text-gray-800 mb-2">
                  Merhaba, {user.name} {user.surname}
                </h2>
                <p className="text-gray-600 text-sm">{user.role}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-6 mb-6">
              <p>
                <span className="font-semibold text-gray-700">E-posta:</span>{" "}
                {user.email}
              </p>
              <p>
                <span className="font-semibold text-gray-700">Telefon:</span>{" "}
                {user.phone}
              </p>
              <p>
                <span className="font-semibold text-gray-700">Şifre:</span>{" "}
                {user.password}
              </p>
            </div>
            <button
              onClick={handleUpdateInfo}
              className="mt-6 w-full bg-gray-300 text-gray-800 py-3 rounded-lg hover:bg-gray-400"
            >
              Kişisel Bilgileri Güncelle
            </button>
          </div>
        )}

        {activeTab === "ads" && (
          <div className="ads-list mt-6">
            <h2 className="text-2xl font-semibold mb-3 text-gray-800">
              İlanlarım
            </h2>
            {ads.length > 0 ? (
              <ul className="space-y-4">
                {ads.map((ad) => (
                  <li
                    key={ad.id}
                    className="bg-white p-4 rounded-md shadow-sm hover:shadow-md transition duration-300"
                  >
                    <h3 className="text-xl font-medium text-gray-700">
                      {ad.title}
                    </h3>
                    <p>{ad.description}</p>
                    <div className="mt-2 flex space-x-4">
                      <button
                        onClick={() => handleEditAd(ad.id)}
                        className="text-blue-500 hover:underline"
                      >
                        İlanı Düzenle
                      </button>
                      <button
                        onClick={() => handleDeleteAd(ad.id)}
                        className="text-red-500 hover:underline"
                      >
                        İlanı Sil
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Henüz ilanınız yok.</p>
            )}
          </div>
        )}

        {activeTab === "comments" && (
          <div className="comments mt-6 bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-3 text-gray-800">
              Yorumlarım
            </h2>
            {comments.length > 0 ? (
              <ul className="space-y-4">
                {comments.map((comment) => (
                  <li
                    key={comment.id}
                    className="bg-gray-50 p-4 rounded-md shadow-sm"
                  >
                    <p className="text-gray-800">{comment.text}</p>
                    <div className="mt-2 flex space-x-4">
                      <button
                        onClick={() => handleEditComment(comment.id)}
                        className="text-blue-500 hover:underline"
                      >
                        Yorum Düzenle
                      </button>
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className="text-red-500 hover:underline"
                      >
                        Yorum Sil
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Henüz yorumunuz yok.</p>
            )}
          </div>
        )}

        {activeTab === "premium" && (
          <div className="premium-info bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-3 text-gray-800">
              Premium Üyelik Avantajları
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Özel içeriklere erişim</li>
              <li>Öncelikli destek</li>
              <li>Ve daha fazlası...</li>
            </ul>
            <button className="px-4 py-2 rounded-md mt-4 bg-yellow-500 text-white hover:bg-yellow-600">
              Premium Üye Ol
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountPage;
