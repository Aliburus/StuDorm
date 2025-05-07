import { Users, FileText, Ban, Building, Briefcase, Clock } from "lucide-react";

function OverviewTab({ stats }) {
  return (
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
              <p className="text-gray-500 text-sm">Total Forum Posts</p>
              <h3 className="text-2xl font-bold text-gray-900">
                {stats.totalPosts.toLocaleString()}
              </h3>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <FileText className="h-6 w-6 text-green-500" />
            </div>
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
      </div>
    </div>
  );
}

export default OverviewTab;
