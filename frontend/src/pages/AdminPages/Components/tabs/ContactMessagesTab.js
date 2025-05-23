import React, { useEffect, useState } from "react";
import axios from "axios";
import { Mail, Send, Loader, AlertCircle } from "lucide-react";

function ContactMessagesTab() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [replyModal, setReplyModal] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchMessages();
    fetchUsers();
  }, []);

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

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      setError("Kullanıcılar alınamadı");
    }
  };

  const handleSendReply = async () => {
    if (!replyMessage.trim()) {
      alert("Lütfen bir mesaj girin");
      return;
    }

    setSending(true);
    try {
      const token = localStorage.getItem("token");
      const payload = {
        contact_message_id: replyModal?.messageId,
        email: replyModal.email,
        message: replyMessage,
      };
      console.log("Gönderilen cevap payload:", payload);
      await axios.post(
        "http://localhost:5000/api/contact-messages/reply",
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Mesaj başarıyla gönderildi");
      setReplyModal(null);
      setReplyMessage("");
    } catch (err) {
      alert("Mesaj gönderilirken bir hata oluştu");
    }
    setSending(false);
  };

  // Kullanıcı e-postası kayıtlı mı kontrolü
  const isUserRegistered = (email) => {
    return users.some((u) => u.email === email);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
        İletişim Mesajları
      </h2>
      {loading ? (
        <div className="flex items-center justify-center p-8">
          <Loader className="w-8 h-8 text-indigo-500 animate-spin" />
        </div>
      ) : error ? (
        <div className="flex items-center justify-center p-8 text-red-500">
          <AlertCircle className="w-8 h-8 mr-2" />
          {error}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2 font-semibold">ID</th>
                <th className="px-4 py-2 font-semibold">E-posta</th>
                <th className="px-4 py-2 font-semibold">Mesaj</th>
                <th className="px-4 py-2 font-semibold">Tarih</th>
                <th className="px-4 py-2 font-semibold">İşlemler</th>
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
                  <td className="px-4 py-2 border-t text-center">
                    {isUserRegistered(m.email) && (
                      <button
                        onClick={() =>
                          setReplyModal({
                            open: true,
                            email: m.email,
                            messageId: m.id,
                          })
                        }
                        className="bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-600 flex items-center justify-center mx-auto"
                      >
                        <Mail className="w-4 h-4 mr-1" />
                        Cevapla
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {replyModal?.open && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h2 className="text-xl font-bold mb-4">Mesaj Gönder</h2>
            <p className="mb-4">Alıcı: {replyModal.email}</p>
            <textarea
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              placeholder="Mesajınızı yazın..."
              className="w-full h-32 p-2 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  setReplyModal(null);
                  setReplyMessage("");
                }}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                İptal
              </button>
              <button
                onClick={handleSendReply}
                disabled={sending}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 flex items-center"
              >
                {sending ? (
                  <Loader className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-1" />
                    Gönder
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ContactMessagesTab;
