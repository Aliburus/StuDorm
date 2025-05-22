import React, { useEffect, useState } from "react";
import {
  Search,
  Trash2,
  Shield,
  User,
  Loader,
  AlertCircle,
} from "lucide-react";
import { AdminService } from "../../../../services/AdminService"; // Adjust the import path as necessary

// Using the same AdminService as before
function UsersTab() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [processingId, setProcessingId] = useState(null);

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
      setIsAdmin(decoded.user_type === "admin");
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
      setProcessingId(id);
      try {
        await AdminService.deleteUser(id);
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      } catch (err) {
        alert("Kullanıcı silinirken bir hata oluştu.");
      } finally {
        setProcessingId(null);
      }
    }
  };

  const handleUserTypeChange = async (userId, newUserType) => {
    if (!isAdmin) {
      alert("Sadece adminler kullanıcı tipi değiştirebilir.");
      return;
    }

    setProcessingId(userId);
    try {
      await AdminService.updateUserType(userId, newUserType);
      alert("Kullanıcı tipi başarıyla güncellendi.");
      await fetchUsers();
    } catch (err) {
      console.error("API Error:", err);
      alert("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setProcessingId(null);
    }
  };

  const sortedUsers = [...users]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .filter((user) =>
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300">
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-gray-50">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          User Management
        </h2>
        <div className="relative w-full max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by email"
            value={searchTerm}
            onChange={handleSearch}
            className="pl-10 w-full p-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center p-12">
          <Loader className="h-10 w-10 text-indigo-500 animate-spin mb-4" />
          <p className="text-gray-600">Loading users...</p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center p-12">
          <AlertCircle className="h-10 w-10 text-red-500 mb-4" />
          <p className="text-red-600 font-medium">{error}</p>
          <button
            onClick={fetchUsers}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      ) : sortedUsers.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12">
          <p className="text-gray-500">No users found matching your search.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Join Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedUsers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {user.name} {user.surname}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col space-y-2">
                      <span
                        className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${
                          user.user_type === "admin"
                            ? "bg-indigo-100 text-indigo-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {user.user_type === "admin" ? (
                          <Shield className="w-3 h-3 mr-1" />
                        ) : (
                          <User className="w-3 h-3 mr-1" />
                        )}
                        {user.user_type}
                      </span>

                      {isAdmin && (
                        <div className="mt-1">
                          <select
                            onChange={(e) =>
                              handleUserTypeChange(user.id, e.target.value)
                            }
                            value={user.user_type}
                            disabled={processingId === user.id}
                            className="w-full py-1.5 px-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-200"
                          >
                            <option value="normal">Normal</option>
                            <option value="premium">Premium</option>
                            <option value="admin">Admin</option>
                          </select>
                          {processingId === user.id && (
                            <div className="flex justify-center mt-1">
                              <Loader className="w-4 h-4 text-indigo-500 animate-spin" />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">
                      {formatDate(user.created_at)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleDelete(user.id)}
                      disabled={processingId === user.id}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                    >
                      {processingId === user.id ? (
                        <Loader className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          <Trash2 className="w-4 h-4 mr-1" />
                          Sil
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default UsersTab;
