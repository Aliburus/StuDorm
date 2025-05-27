import React, { useEffect, useState } from "react";
import axios from "axios";
import { Mail, Send, Loader } from "lucide-react";
import ErrorMessage from "../../../../components/ErrorMessage";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

function ContactMessagesTab() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");
  const [replyModal, setReplyModal] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${BASE_URL}/api/contact-messages/all`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Mesajları tarihe göre sırala (en yeni en üstte)
        const sortedMessages = response.data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setMessages(sortedMessages);
        setLoading(false);
      } catch (error) {
        console.error("Mesajlar alınamadı:", error);
        setError("Mesajlar yüklenirken bir hata oluştu");
        setLoading(false);
      }
    };

    fetchMessages();
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${BASE_URL}/api/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      setError("admin/user/fetch/failed");
    }
  };

  const handleSendReply = async () => {
    if (!replyMessage.trim()) {
      setError("contact/validation/message");
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
      await axios.post(`${BASE_URL}/api/contact-messages/reply`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess("contact/reply/success");
      setReplyModal(null);
      setReplyMessage("");
    } catch (err) {
      setError("contact/reply/failed");
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

      {error && <ErrorMessage message={error} />}
      {success && <ErrorMessage message={success} severity="success" />}

      {loading ? (
        <div className="flex items-center justify-center p-8">
          <Loader className="w-8 h-8 text-indigo-500 animate-spin" />
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
