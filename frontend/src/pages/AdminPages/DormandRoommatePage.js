import React, { useState } from "react";

const dormsData = [
  { id: 1, name: "Greenwood Dorm", roomCount: 10 },
  { id: 2, name: "Sunset Dorm", roomCount: 8 },
];

const roommatesData = [
  { id: 1, name: "John Doe", dorm: "Greenwood Dorm", room: "Room 1" },
  { id: 2, name: "Jane Smith", dorm: "Greenwood Dorm", room: "Room 2" },
  { id: 3, name: "Alex Johnson", dorm: "Sunset Dorm", room: "Room 1" },
];

const DormAndRoommatePage = () => {
  const [dorms] = useState(dormsData);
  const [roommates] = useState(roommatesData);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dorm and Roommate Management</h1>
      <p className="mb-6">
        Manage dormitories and roommates here. Below is the list of dorms and
        assigned roommates.
      </p>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Dormitories</h2>
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">Dorm Name</th>
              <th className="px-4 py-2 text-left">Number of Rooms</th>
            </tr>
          </thead>
          <tbody>
            {dorms.map((dorm) => (
              <tr key={dorm.id} className="border-b">
                <td className="px-4 py-2">{dorm.name}</td>
                <td className="px-4 py-2">{dorm.roomCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Roommates</h2>
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Dorm</th>
              <th className="px-4 py-2 text-left">Room</th>
            </tr>
          </thead>
          <tbody>
            {roommates.map((roommate) => (
              <tr key={roommate.id} className="border-b">
                <td className="px-4 py-2">{roommate.name}</td>
                <td className="px-4 py-2">{roommate.dorm}</td>
                <td className="px-4 py-2">{roommate.room}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DormAndRoommatePage;
