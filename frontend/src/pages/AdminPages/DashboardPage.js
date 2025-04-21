import { useEffect, useState } from "react";
import Navbar from "../AdminPages/Components/Navbar";
import TabNavigation from "../AdminPages/Components/TabNavigation";
import OverviewTab from "./Components/tabs/OverwievTabs";
import UsersTab from "./Components/tabs/UsersTabs";
import ListingsTab from "./Components/tabs/ListingTabs";
import SettingsTab from "./Components/tabs/SettingTabs";
import { AdminService } from "../../services/AdminService";

export const adminData = {
  name: "Admin User",
  email: "admin@dormfinder.com",
};

export const notifications = [
  {
    id: 1,
    text: "New listing needs approval",
    time: "5m ago",
    type: "approval",
  },
  { id: 2, text: "Reported user content", time: "1h ago", type: "report" },
  { id: 3, text: "New user registration", time: "2h ago", type: "user" },
];

export const recentUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    status: "active",
    joinDate: "2024-03-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    status: "pending",
    joinDate: "2024-03-14",
  },
  {
    id: 3,
    name: "Bob Wilson",
    email: "bob@example.com",
    status: "banned",
    joinDate: "2024-03-13",
  },
];

function DashboardPage() {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [stats, setStats] = useState(null);
  const [statsError, setStatsError] = useState(null);

  useEffect(() => {
    if (selectedTab === "overview") {
      AdminService.getOverviewStats()
        .then((data) => setStats(data))
        .catch((err) => {
          console.error("❌ Error fetching overview stats:", err);
          setStatsError(err);
        });
    }
  }, [selectedTab]);

  useEffect(() => {
    if (selectedTab === "listings") {
      setLoading(true);
      AdminService.getAllListings()
        .then((data) => {
          console.log("✅ Listings data:", data);
          setListings(data);
        })
        .catch((err) => {
          console.error("❌ Error fetching listings:", err);
          setError(err);
        })
        .finally(() => setLoading(false));
    }
  }, [selectedTab]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar adminData={adminData} notifications={notifications} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TabNavigation
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />

        {selectedTab === "overview" && (
          <>
            {!stats && !statsError && <div>Loading stats...</div>}
            {statsError && (
              <div className="text-red-500">Error loading stats</div>
            )}
            {stats && <OverviewTab stats={stats} />}
          </>
        )}

        {selectedTab === "users" && <UsersTab users={recentUsers} />}
        {selectedTab === "listings" && (
          <>
            {loading && (
              <div className="text-center text-gray-500 py-4">
                Loading listings...
              </div>
            )}
            {error && (
              <div className="text-center text-red-500 py-4">
                Failed to load listings.
              </div>
            )}
            {!loading && !error && <ListingsTab listings={listings} />}
          </>
        )}
        {selectedTab === "settings" && <SettingsTab adminData={adminData} />}
      </div>
    </div>
  );
}

export default DashboardPage;
