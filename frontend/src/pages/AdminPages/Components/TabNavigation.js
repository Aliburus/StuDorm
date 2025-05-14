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
          Overview
        </button>
        <button
          onClick={() => setSelectedTab("users")}
          className={`${
            selectedTab === "users"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
        >
          Users
        </button>
        <button
          onClick={() => setSelectedTab("listings")}
          className={`${
            selectedTab === "listings"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
        >
          Listings
        </button>
        <button
          onClick={() => setSelectedTab("settings")}
          className={`${
            selectedTab === "settings"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
        >
          Settings
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
      </nav>
    </div>
  );
}

export default TabNavigation;
