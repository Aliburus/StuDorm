import { useEffect, useState } from "react";
import Navbar from "../AdminPages/Components/Navbar";
import TabNavigation from "../AdminPages/Components/TabNavigation";
import OverviewTab from "./Components/tabs/OverwievTabs";
import UsersTab from "./Components/tabs/UsersTabs";
import ListingsTab from "./Components/tabs/ListingTabs";
import SettingsTab from "./Components/tabs/SettingTabs";
import { AdminService } from "../../services/AdminService";
import ForumPosts from "./Components/tabs/ForumPosts";
import LogsTab from "./Components/tabs/LogsTab";
import PremiumBenefitsTab from "./Components/tabs/PremiumBenefitsTab";
import ContactMessagesTab from "./Components/tabs/ContactMessagesTab";

function DashboardPage() {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);
  const [statsError, setStatsError] = useState(null);

  const [AllPosts, setAllPosts] = useState([]);

  const refreshListings = async () => {
    setLoading(true);
    try {
      const data = await AdminService.getAllListings();
      setListings(data);
    } catch (err) {
      console.error("❌ Error fetching listings:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

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
    if (selectedTab === "posts") {
      setLoading(true);
      AdminService.getAllPosts()
        .then((data) => {
          setAllPosts(data);
        })
        .catch((err) => {
          console.error("❌ Error fetching posts:", err);
          setError(err);
        })
        .finally(() => setLoading(false));
    }
  }, [selectedTab]);
  useEffect(() => {
    if (selectedTab === "listings") {
      refreshListings();
    }
  }, [selectedTab]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

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

        {selectedTab === "users" && <UsersTab />}
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
            {!loading && !error && (
              <ListingsTab
                listings={listings}
                refreshListings={refreshListings}
              />
            )}
          </>
        )}
        {selectedTab === "settings" && <SettingsTab />}

        {selectedTab === "posts" && <ForumPosts AllPosts={AllPosts} />}
        {selectedTab === "logs" && <LogsTab />}
        {selectedTab === "premium" && <PremiumBenefitsTab />}
        {selectedTab === "contact" && <ContactMessagesTab />}
      </div>
    </div>
  );
}

export default DashboardPage;
