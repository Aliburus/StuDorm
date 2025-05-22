import React, { useEffect, useState } from "react";
import axios from "axios";

function ContactMessagesTab() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "http://localhost:5000/api/contact-messages/all",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setMessages(res.data);
      } catch (err) {
        setError("Mesajlar alınamadı");
      }
      setLoading(false);
    };
    fetchMessages();
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
        İletişim Mesajları
      </h2>
      {loading ? (
        <div>Yükleniyor...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2 font-semibold">ID</th>
                <th className="px-4 py-2 font-semibold">E-posta</th>
                <th className="px-4 py-2 font-semibold">Mesaj</th>
                <th className="px-4 py-2 font-semibold">Tarih</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((m) => (
                <tr key={m.id} className="hover:bg-yellow-50 transition">
                  <td className="px-4 py-2 border-t text-center">{m.id}</td>
                  <td className="px-4 py-2 border-t">{m.email}</td>
                  <td className="px-4 py-2 border-t max-w-xs whitespace-pre-line text-gray-700">
                    {m.message}
                  </td>
                  <td className="px-4 py-2 border-t text-center text-xs text-gray-500">
                    {m.created_at && m.created_at.split("T")[0]}
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

export default ContactMessagesTab;
