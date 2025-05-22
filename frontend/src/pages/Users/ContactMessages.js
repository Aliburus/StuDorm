import React, { useEffect, useState } from "react";
import { getUserMessages } from "../../services/ContactService"; // correct named import

const ContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [expandedMessages, setExpandedMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await getUserMessages();
        setMessages(data);
      } catch (err) {
        console.error(err);
        setError("Mesajlar alınırken bir hata oluştu.");
      }
    };
    fetchMessages();
  }, []);

  const toggleExpand = (msgId) => {
    setExpandedMessages((prev) =>
      prev.includes(msgId)
        ? prev.filter((id) => id !== msgId)
        : [...prev, msgId]
    );
  };

  if (error) return <div className="text-red-500">{error}</div>;
  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-4">Gönderdiğim Mesajlar</h2>
      {messages.length === 0 ? (
        <p>Henüz gönderilmiş mesaj yok.</p>
      ) : (
        <ul className="space-y-4">
          {messages.map((m) => (
            <li key={m.id} className="border p-4 rounded">
              <p className="font-semibold text-gray-700">
                {new Date(m.created_at).toLocaleString()}
              </p>
              <p
                className="text-gray-700 text-base mb-2 border-l-4 border-yellow-400 pl-4 py-2 bg-yellow-50 rounded-r-lg"
                style={{ wordBreak: "break-word" }}
              >
                {expandedMessages.includes(m.id)
                  ? m.message
                  : m.message.slice(0, 50) +
                    (m.message.length > 50 ? "..." : "")}
              </p>
              {m.message.length > 50 && (
                <button
                  className="text-yellow-600 underline text-sm mb-2"
                  onClick={() => toggleExpand(m.id)}
                >
                  {expandedMessages.includes(m.id)
                    ? "Küçült"
                    : "Devamını Göster"}
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ContactMessages;
