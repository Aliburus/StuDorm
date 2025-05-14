import React from "react";
import {
  Users,
  FileText,
  Ban,
  Building,
  Briefcase,
  Clock,
  TrendingUp,
  Crown,
  UserCheck,
  Clock8,
} from "lucide-react";

function OverviewTab({ stats }) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Users</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">
                  {stats.totalUsers.toLocaleString()}
                </h3>
              </div>
              <div className="bg-blue-100 p-3 rounded-xl">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Crown className="h-4 w-4 text-purple-500" />
                <span className="text-sm text-gray-600">
                  Premium: {stats.premiumUsers}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <UserCheck className="h-4 w-4 text-green-500" />
                <span className="text-sm text-gray-600">
                  Basic: {stats.basicUsers}
                </span>
              </div>
            </div>
          </div>
          <div className="px-6 py-3 bg-gradient-to-r from-blue-50 to-blue-100">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              <span className="text-sm text-blue-600">Active Growth</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Listings
                </p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">
                  {stats.totalListings.toLocaleString()}
                </h3>
              </div>
              <div className="bg-yellow-100 p-3 rounded-xl">
                <FileText className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <UserCheck className="h-4 w-4 text-green-500" />
                <span className="text-sm text-gray-600">
                  Active: {stats.activeUsers}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock8 className="h-4 w-4 text-orange-500" />
                <span className="text-sm text-gray-600">
                  Pending: {stats.pendingApprovals}
                </span>
              </div>
            </div>
          </div>
          <div className="px-6 py-3 bg-gradient-to-r from-yellow-50 to-yellow-100">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-yellow-600" />
              <span className="text-sm text-yellow-600">Listing Growth</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Forum Posts</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">
                  {stats.totalPosts.toLocaleString()}
                </h3>
              </div>
              <div className="bg-green-100 p-3 rounded-xl">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="px-6 py-3 bg-gradient-to-r from-green-50 to-green-100">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-sm text-green-600">Engagement Rate</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Listing Categories
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white p-2 rounded-lg">
                <Building className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-blue-600">
                {stats.dormListings.toLocaleString()}
              </span>
            </div>
            <h4 className="text-sm font-medium text-gray-900">Dorm Listings</h4>
            <p className="text-xs text-gray-500 mt-1">
              Available accommodations
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white p-2 rounded-lg">
                <Briefcase className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-2xl font-bold text-green-600">
                {stats.internListings.toLocaleString()}
              </span>
            </div>
            <h4 className="text-sm font-medium text-gray-900">
              Intern Listings
            </h4>
            <p className="text-xs text-gray-500 mt-1">
              Internship opportunities
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white p-2 rounded-lg">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
              <span className="text-2xl font-bold text-purple-600">
                {stats.partTimeListings.toLocaleString()}
              </span>
            </div>
            <h4 className="text-sm font-medium text-gray-900">
              Part-time Jobs
            </h4>
            <p className="text-xs text-gray-500 mt-1">Flexible work options</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OverviewTab;
