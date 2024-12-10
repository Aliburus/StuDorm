import React, { useState } from "react";

// Örnek veriler (gerçek dünyada bu veriler API'den alınabilir)
const partTimeWorkersData = [
  { id: 1, name: "John Doe", position: "Cashier", hoursWorked: 20 },
  { id: 2, name: "Jane Smith", position: "Barista", hoursWorked: 18 },
  { id: 3, name: "Alex Johnson", position: "Cook", hoursWorked: 25 },
];

const PartTimeManagementPage = () => {
  const [partTimeWorkers] = useState(partTimeWorkersData);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Part-Time Management</h1>
      <p className="mb-6">
        Manage part-time workers, their positions, and working hours here.
      </p>

      {/* Part-Time Workers List Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Part-Time Workers</h2>
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Position</th>
              <th className="px-4 py-2 text-left">Hours Worked</th>
            </tr>
          </thead>
          <tbody>
            {partTimeWorkers.map((worker) => (
              <tr key={worker.id} className="border-b">
                <td className="px-4 py-2">{worker.name}</td>
                <td className="px-4 py-2">{worker.position}</td>
                <td className="px-4 py-2">{worker.hoursWorked}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PartTimeManagementPage;
