import React, { useEffect, useState } from "react";
import { AdminService } from "../../../../services/AdminService";

function UsersTab() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isAdmin, setIsAdmin] = useState(false); // Admin kontrolü

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await AdminService.getUsers();
      setUsers(data);
    } catch (err) {
      setError("Bir hata oluştu, kullanıcılar alınamadı.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    // Admin kontrolü
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      setIsAdmin(decoded.user_type === "admin"); // Admin olup olmadığını kontrol et
    }
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("tr-TR");
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bu kullanıcıyı silmek istediğinizden emin misiniz?")) {
      try {
        await AdminService.deleteUser(id);
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      } catch (err) {
        alert("Kullanıcı silinirken bir hata oluştu.");
      }
    }
  };

  const handleUserTypeChange = async (userId, newUserType) => {
    if (!isAdmin) {
      alert("Sadece adminler kullanıcı tipi değiştirebilir.");
      return;
    }

    try {
      // Bu kodu güncelledik: JSON formatında veri gönderimi yapılacak
      const response = await AdminService.updateUserType(userId, {
        user_type: newUserType,
      });
      if (response.status === 200) {
        alert("Kullanıcı tipi başarıyla güncellendi.");
        fetchUsers(); // Kullanıcılar güncellenmiş olarak tekrar al
      } else {
        alert("Kullanıcı tipi güncellenirken bir hata oluştu.");
      }
    } catch (err) {
      console.error("API Error:", err);
      alert("Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  const sortedUsers = [...users]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .filter((user) =>
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">User Management</h2>
        <input
          type="text"
          placeholder="Search by email"
          value={searchTerm}
          onChange={handleSearch}
          className="mt-2 p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="overflow-x-auto">
        {loading ? (
          <div className="p-4">Loading...</div>
        ) : error ? (
          <div className="text-red-500 p-4">{error}</div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Join Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedUsers.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {user.name} {user.surname}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.user_type === "admin"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {user.user_type}
                    </span>
                    {isAdmin && user.user_type !== "admin" && (
                      <div className="mt-2">
                        <select
                          onChange={(e) =>
                            handleUserTypeChange(user.id, e.target.value)
                          }
                          value={user.user_type}
                          className="p-2 border border-gray-300 rounded"
                        >
                          <option value="normal">Normal</option>
                          <option value="admin">Admin</option>
                        </select>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(user.created_at)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-red-600 hover:text-red-800 font-semibold"
                    >
                      Sil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default UsersTab;
