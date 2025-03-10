import {
  Users,
  Building,
  Briefcase,
  Clock,
  UserPlus,
  Bell,
  Settings,
  Ban,
  CheckCircle,
  FileText,
  MessageSquare,
  Mail,
  UserCog,
  ShieldAlert,
  Activity,
} from "lucide-react";
import { useState } from "react";

function App() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedTab, setSelectedTab] = useState("overview"); // 'overview', 'users', 'listings', 'settings'

  // Mock admin data
  const adminData = {
    name: "Admin User",
    email: "admin@dormfinder.com",
  };

  const stats = {
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

  const notifications = [
    {
      id: 1,
      text: "New listing needs approval",
      time: "5m ago",
      type: "approval",
    },
    { id: 2, text: "Reported user content", time: "1h ago", type: "report" },
    { id: 3, text: "New user registration", time: "2h ago", type: "user" },
  ];

  const recentUsers = [
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

  const recentListings = [
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-gray-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold">Admin Panel</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 text-gray-300 hover:text-white relative"
                >
                  <Bell className="h-6 w-6" />
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                </button>
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg py-2 z-50">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="px-4 py-3 hover:bg-gray-50 border-b border-gray-100"
                      >
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-800">
                            {notification.text}
                          </p>
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              notification.type === "approval"
                                ? "bg-yellow-100 text-yellow-800"
                                : notification.type === "report"
                                ? "bg-red-100 text-red-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {notification.type}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {notification.time}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm">{adminData.email}</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
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
          </nav>
        </div>

        {/* Overview Tab */}
        {selectedTab === "overview" && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Total Users</p>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {stats.totalUsers.toLocaleString()}
                    </h3>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Users className="h-6 w-6 text-blue-500" />
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-sm text-gray-500">
                    Premium: {stats.premiumUsers}
                  </span>
                  <span className="text-sm text-gray-500 ml-4">
                    Basic: {stats.basicUsers}
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Total Listings</p>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {stats.totalListings.toLocaleString()}
                    </h3>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded-lg">
                    <FileText className="h-6 w-6 text-yellow-500" />
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-sm text-gray-500">
                    Active: {stats.activeUsers}
                  </span>
                  <span className="text-sm text-gray-500 ml-4">
                    Pending: {stats.pendingApprovals}
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Reported Content</p>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {stats.reportedContent}
                    </h3>
                  </div>
                  <div className="bg-red-100 p-3 rounded-lg">
                    <Ban className="h-6 w-6 text-red-500" />
                  </div>
                </div>
                <button className="mt-4 text-red-500 text-sm font-medium hover:text-red-600">
                  Review Reports →
                </button>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">System Status</p>
                    <h3 className="text-2xl font-bold text-green-500">
                      Online
                    </h3>
                  </div>
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Activity className="h-6 w-6 text-green-500" />
                  </div>
                </div>
              </div>
            </div>

            {/* Listing Types Overview */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center space-x-3">
                  <Building className="h-5 w-5 text-blue-500" />
                  <span className="text-sm text-gray-500">Dorm Listings</span>
                </div>
                <p className="text-2xl font-bold mt-2">
                  {stats.dormListings.toLocaleString()}
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center space-x-3">
                  <Briefcase className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-500">Intern Listings</span>
                </div>
                <p className="text-2xl font-bold mt-2">
                  {stats.internListings.toLocaleString()}
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-purple-500" />
                  <span className="text-sm text-gray-500">Part-time Jobs</span>
                </div>
                <p className="text-2xl font-bold mt-2">
                  {stats.partTimeListings.toLocaleString()}
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center space-x-3">
                  <UserPlus className="h-5 w-5 text-pink-500" />
                  <span className="text-sm text-gray-500">
                    Roommate Listings
                  </span>
                </div>
                <p className="text-2xl font-bold mt-2">
                  {stats.roommateListings.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {selectedTab === "users" && (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">
                  User Management
                </h2>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="px-4 py-2 border rounded-md"
                  />
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                    Search
                  </button>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Join Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentUsers.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {user.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {user.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.status === "active"
                              ? "bg-green-100 text-green-800"
                              : user.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.joinDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">
                          Edit
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Listings Tab */}
        {selectedTab === "listings" && (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">
                  Listing Management
                </h2>
                <div className="flex space-x-2">
                  <select className="px-4 py-2 border rounded-md">
                    <option value="">All Types</option>
                    <option value="dorm">Dorm</option>
                    <option value="intern">Intern</option>
                    <option value="part-time">Part-time</option>
                    <option value="roommate">Roommate</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Search listings..."
                    className="px-4 py-2 border rounded-md"
                  />
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                    Search
                  </button>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentListings.map((listing) => (
                    <tr key={listing.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {listing.title}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {listing.type}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            listing.status === "active"
                              ? "bg-green-100 text-green-800"
                              : listing.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {listing.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {listing.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">
                          Edit
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {selectedTab === "settings" && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Admin Settings
            </h2>
            <div className="space-y-6 max-w-2xl">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Admin Email
                </label>
                <input
                  type="email"
                  value={adminData.email}
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Change Password
                </label>
                <input
                  type="password"
                  placeholder="Current password"
                  className="w-full px-4 py-2 border rounded-md mb-2"
                />
                <input
                  type="password"
                  placeholder="New password"
                  className="w-full px-4 py-2 border rounded-md mb-2"
                />
                <input
                  type="password"
                  placeholder="Confirm new password"
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>
              <div className="pt-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
