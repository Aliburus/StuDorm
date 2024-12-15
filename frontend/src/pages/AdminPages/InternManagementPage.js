import React, { useState } from "react";

const internsData = [
  { id: 1, name: "John Doe", department: "Marketing", duration: "6 months" },
  {
    id: 2,
    name: "Jane Smith",
    department: "Engineering",
    duration: "3 months",
  },
  { id: 3, name: "Alex Johnson", department: "HR", duration: "12 months" },
];

const InternManagementPage = () => {
  const [interns] = useState(internsData);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Intern Management</h1>
      <p className="mb-6">
        Manage interns, their departments, and internship durations.
      </p>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Interns</h2>
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Department</th>
              <th className="px-4 py-2 text-left">Duration</th>
            </tr>
          </thead>
          <tbody>
            {interns.map((intern) => (
              <tr key={intern.id} className="border-b">
                <td className="px-4 py-2">{intern.name}</td>
                <td className="px-4 py-2">{intern.department}</td>
                <td className="px-4 py-2">{intern.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InternManagementPage;
