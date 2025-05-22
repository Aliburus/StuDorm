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

  function renderLogSummary(log) {
    if (log.action === "USER DELETED") {
      return `Kullanıcı ID: ${
        log.details?.deletedUserId || "-"
      }  Kullanıcı Adı: ${log.details?.deletedUserName || "-"}  E-posta: ${
        log.details?.deletedUserEmail || "-"
      }`;
    }
    if (log.action === "LOGIN") {
      return `E-posta: ${log.details?.email || "-"}`;
    }
    if (log.action === "PREMIUM_BENEFIT_UPDATE") {
      return `ID: ${log.details?.id || "-"}`;
    }
    if (log.action === "PROFILE_UPDATE") {
      return `Ad: ${log.details?.newName || "-"} Soyad: ${
        log.details?.newSurname || "-"
      } E-posta: ${log.details?.newEmail || "-"}`;
    }
    if (log.details && typeof log.details === "object") {
      const keys = Object.keys(log.details);
      if (keys.length === 0) return "-";
      return keys
        .slice(0, 2)
        .map(
          (k) =>
            `${k}: ${
              typeof log.details[k] === "object" ? "..." : log.details[k]
            }`
        )
        .join("  ");
    }
    return String(log.details || "-");
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
      <table className="hidden"></table>
      <div className="space-y-4">
        {logs.map((log) => (
          <div
            key={log.id}
            className="flex flex-col md:flex-row md:items-center justify-between bg-gray-50 rounded-lg p-4 border border-gray-200 shadow-sm"
          >
            <div className="flex items-center min-w-[180px] mb-2 md:mb-0 md:mr-4">
              <span className="font-bold text-indigo-700 text-base mr-2">
                {log.action.replace(/_/g, " ").toUpperCase()}
              </span>
              <span className="text-gray-800 text-sm">
                {renderLogSummary(log)}
              </span>
            </div>
            <div className="text-xs text-gray-400 mt-2 md:mt-0 md:ml-4 text-right min-w-[120px]">
              {new Date(log.created_at).toLocaleString("tr-TR", {
                dateStyle: "short",
                timeStyle: "short",
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserLogDetails;
