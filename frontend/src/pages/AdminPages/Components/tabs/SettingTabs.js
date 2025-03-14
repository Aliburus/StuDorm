function SettingsTab({ adminData }) {
  return (
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
  );
}

export default SettingsTab;
