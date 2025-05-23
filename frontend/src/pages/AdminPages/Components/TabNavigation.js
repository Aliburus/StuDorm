function TabNavigation({ selectedTab, setSelectedTab }) {
  const tabs = [
    { key: "overview", label: "Genel Bakış" },
    { key: "users", label: "Kullanıcılar" },
    { key: "listings", label: "İlanlar" },
    { key: "posts", label: "Forum Gönderileri" },
    { key: "logs", label: "İşlem Logları" },
    { key: "premium", label: "Premium Benefits" },
    { key: "contact", label: "Contact Mesajları" },
    { key: "settings", label: "Ayarlar" },
  ];
  return (
    <div className="mb-6 border-b border-gray-200">
      <nav className="-mb-px flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setSelectedTab(tab.key)}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200
              ${
                selectedTab === tab.key
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-blue-500 hover:text-blue-700 hover:border-blue-700"
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
}

export default TabNavigation;
