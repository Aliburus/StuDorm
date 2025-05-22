function TabNavigation({ selectedTab, setSelectedTab }) {
  return (
    <div className="mb-6 border-b border-gray-200">
      <nav className="-mb-px flex space-x-8">
        <button
          onClick={() => setSelectedTab("overview")}
          className={`${
            selectedTab === "overview"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
        >
          Genel Bakış
        </button>
        <button
          onClick={() => setSelectedTab("users")}
          className={`${
            selectedTab === "users"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
        >
          Kullanıcılar
        </button>
        <button
          onClick={() => setSelectedTab("listings")}
          className={`${
            selectedTab === "listings"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
        >
          İlanlar
        </button>
        <button
          onClick={() => setSelectedTab("settings")}
          className={`${
            selectedTab === "settings"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
        >
          Ayarlar
        </button>

        <button
          onClick={() => setSelectedTab("posts")}
          className={`${
            selectedTab === "posts"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
        >
          Forum Gönderileri
        </button>

        <button
          onClick={() => setSelectedTab("logs")}
          className={`${
            selectedTab === "logs"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
        >
          İşlem Logları
        </button>

        <button
          onClick={() => setSelectedTab("premium")}
          className={`$${
            selectedTab === "premium"
              ? "border-yellow-400 text-yellow-500 font-bold"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
        >
          Premium Benefits
        </button>

        <button
          onClick={() => setSelectedTab("contact")}
          className={`$${
            selectedTab === "contact"
              ? "border-yellow-400 text-yellow-500 font-bold"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
        >
          Contact Mesajları
        </button>
      </nav>
    </div>
  );
}

export default TabNavigation;
