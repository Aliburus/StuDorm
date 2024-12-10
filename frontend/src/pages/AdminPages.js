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
    <div>
      <Navbar />
      <div className="flex w-full h-full">
        {/* Sidebar */}
        <div className="bg-black w-[30%] h-[100vh]">
          <ul className="w-full text-white">
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
                className={`p-2 cursor-pointer ${
                  activePage === item ? "bg-yellow-500" : "hover:bg-yellow-500"
                }`}
                onClick={() => setActivePage(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6">
          <div className="bg-white shadow rounded p-4">{renderContent()}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminPages;
