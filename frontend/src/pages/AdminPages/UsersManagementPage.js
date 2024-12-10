const UsersManagementPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">Users Management</h1>
      <p>Manage user accounts, roles, and permissions from this page.</p>
      <table className="table-auto w-full mt-4 bg-white shadow">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Role</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2">John Doe</td>
            <td className="border px-4 py-2">john@example.com</td>
            <td className="border px-4 py-2">Admin</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Jane Smith</td>
            <td className="border px-4 py-2">jane@example.com</td>
            <td className="border px-4 py-2">User</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UsersManagementPage;
