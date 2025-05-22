import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AdminService } from "../../../../services/AdminService";

function UserLogDetails() {
  const { userId } = useParams();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setLoading(true);
        const response = await AdminService.getUserLogs(userId);
        setLogs(response.data);
      } catch (err) {
        setError("Loglar yüklenirken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, [userId]);

  if (loading) return <div className="p-4">Yükleniyor...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  if (!logs.length) {
    return (
      <div className="p-8 text-center text-gray-500">
        Kullanıcıya ait işlem kaydı bulunamadı.
        <br />
        <Link to="/admin" className="text-blue-600 underline">
          Geri Dön
        </Link>
      </div>
    );
  }

  const user = logs[0];

  function renderDetails(details) {
    if (!details || typeof details !== "object") return String(details);
    return (
      <ul className="list-disc pl-4 text-sm text-gray-700">
        {Object.entries(details).map(([key, value]) => (
          <li key={key}>
            <span className="font-semibold">{key}:</span> {String(value)}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8 mt-8">
      <Link to="/admin" className="text-blue-600 underline mb-4 inline-block">
        ← Tüm Kullanıcı Logları
      </Link>
      <h2 className="text-2xl font-bold mb-2">
        {user.name} {user.surname}
      </h2>
      <div className="mb-4 text-gray-600">{user.email}</div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              İşlem
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Detaylar
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tarih
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {logs.map((log) => (
            <tr key={log.id}>
              <td className="px-4 py-2">{log.action}</td>
              <td className="px-4 py-2">{renderDetails(log.details)}</td>
              <td className="px-4 py-2">
                {new Date(log.created_at).toLocaleString("tr-TR")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserLogDetails;
