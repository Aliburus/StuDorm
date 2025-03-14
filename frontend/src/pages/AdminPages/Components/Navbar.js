import { useState } from "react";
import { Bell } from "lucide-react";

function Navbar({ adminData, notifications }) {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
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
  );
}

export default Navbar;
