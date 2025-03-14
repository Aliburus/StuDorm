import { useState } from "react";
import Navbar from "../AdminPages/Components/Navbar";
import TabNavigation from "../AdminPages/Components/TabNavigation";
import OverviewTab from "./Components/tabs/OverwievTabs";
import UsersTab from "./Components/tabs/UsersTabs";
import ListingsTab from "./Components/tabs/ListingTabs";
import SettingsTab from "./Components/tabs/SettingTabs";

// Mock data
export const adminData = {
  name: "Admin User",
  email: "admin@dormfinder.com",
};

export const stats = {
  totalUsers: 100000,
  activeUsers: 120,
  premiumUsers: 50,
  basicUsers: 125,
  totalListings: 5000,
  internListings: 1000,
  partTimeListings: 1200,
  dormListings: 1400,
  roommateListings: 1400,
  pendingApprovals: 25,
  reportedContent: 8,
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

export const recentListings = [
  {
    id: 1,
    title: "2BR Apartment Near Campus",
    type: "Dorm",
    status: "active",
    date: "2024-03-15",
  },
  {
    id: 2,
    title: "Software Developer Intern",
    type: "Intern",
    status: "pending",
    date: "2024-03-14",
  },
  {
    id: 3,
    title: "Campus Cafe Staff",
    type: "Part-time",
    status: "reported",
    date: "2024-03-13",
  },
];

function DashboardPage() {
  const [selectedTab, setSelectedTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar adminData={adminData} notifications={notifications} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TabNavigation
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />

        {selectedTab === "overview" && <OverviewTab stats={stats} />}
        {selectedTab === "users" && <UsersTab users={recentUsers} />}
        {selectedTab === "listings" && (
          <ListingsTab listings={recentListings} />
        )}
        {selectedTab === "settings" && <SettingsTab adminData={adminData} />}
      </div>
    </div>
  );
}

export default DashboardPage;
