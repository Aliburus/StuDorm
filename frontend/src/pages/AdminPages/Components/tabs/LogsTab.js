import React, { useState, useEffect } from "react";
import { AdminService } from "../../../../services/AdminService";
import { useNavigate } from "react-router-dom";

function LogsTab() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const response = await AdminService.getUserLogs();
      setLogs(response.data);
    } catch (err) {
      setError("Loglar yüklenirken bir hata oluştu.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredLogs = logs.filter(
    (log) =>
      log.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getActionColor = (action) => {
    switch (action) {
      case "PASSWORD_CHANGE":
        return "bg-yellow-100 text-yellow-800";
      case "PROFILE_UPDATE":
        return "bg-blue-100 text-blue-800";
      case "USER_DELETED":
        return "bg-red-100 text-red-800";
      case "USER_TYPE_CHANGED":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getActionLabel = (action) => {
    switch (action) {
      case "PASSWORD_CHANGE":
        return "Şifre Değişikliği";
      case "PROFILE_UPDATE":
        return "Profil Güncelleme";
      case "USER_DELETED":
        return "Kullanıcı Silme";
      case "USER_TYPE_CHANGED":
        return "Kullanıcı Tipi Değişikliği";
      default:
        return action;
    }
  };

  // Kullanıcıya göre grupla
  const users = Array.from(
    new Map(filteredLogs.map((log) => [log.email, log])).values()
  );

  if (loading) return <div className="p-4">Yükleniyor...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Kullanıcı İşlem Logları
        </h2>
        <input
          type="text"
          placeholder="E-posta veya işlem türü ile ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>
      <div className="overflow-x-auto">
        {users.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            İşlem kaydı bulunamadı.
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kullanıcı
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  E-posta
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İşlem Sayısı
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr
                  key={user.email}
                  className="cursor-pointer hover:bg-yellow-50"
                  onClick={() => navigate(`/admin/logs/${user.user_id}`)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.name} {user.surname}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-blue-600 underline">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {filteredLogs.filter((l) => l.email === user.email).length}
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

export default LogsTab;
