import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import UsersManagementPage from "./AdminPages/UsersManagementPage";
import DashboardPage from "./AdminPages/DashboardPage";
import DormandRoommatePage from "./AdminPages/DormandRoommatePage";
import PartTimeManagementPage from "./AdminPages/PartTimeManagementPage";
import InternManagementPage from "./AdminPages/InternManagementPage";
import ContentManagementPage from "./AdminPages/ContentManagementPage";
import RevenueManagementPage from "./AdminPages/RevenueManagementPage";

const AdminPages = () => {
  const [activePage, setActivePage] = useState("Dashboard");

  const renderContent = () => {
    switch (activePage) {
      case "Dashboard":
        return <DashboardPage />;
      case "Users Management":
        return <UsersManagementPage />;
      case "Dorm and Roommate Management":
        return <DormandRoommatePage />;
      case "Part-Time Management":
        return <PartTimeManagementPage />;
      case "Intern Management":
        return <InternManagementPage />;
      case "Content Management":
        return <ContentManagementPage />;
      case "Messages and Support":
        return <div>Handle Messages and Support Here.</div>;
      case "Revenue Management":
        return <RevenueManagementPage />;
      default:
        return <div>Select a menu item to view its content.</div>;
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <div className="bg-white w-[250px] h-full p-6 shadow-md">
          <ul className="text-gray-700 space-y-4">
            {[
              "Dashboard",
              "Users Management",
              "Dorm and Roommate Management",
              "Part-Time Management",
              "Intern Management",
              "Content Management",
              "Messages and Support",
              "Revenue Management",
            ].map((item) => (
              <li
                key={item}
                className={`p-3 cursor-pointer text-lg rounded-md transition duration-300 ${
                  activePage === item
                    ? "border-l-4 border-yellow-500 text-gray-800 font-semibold"
                    : "text-gray-600"
                }`}
                onClick={() => setActivePage(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1 p-8 overflow-auto">
          <div className="bg-white shadow rounded-lg p-6 h-full">
            {renderContent()}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminPages;
