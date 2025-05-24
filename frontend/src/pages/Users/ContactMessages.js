import React, { useEffect, useState } from "react";
import { getUserMessages } from "../../services/ContactService";
import axios from "axios";

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const ContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [expandedMessages, setExpandedMessages] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await getUserMessages();
        setMessages(data);
        // Her mesaj için cevabı getir
        data.forEach(async (msg) => {
          try {
            const res = await axios.get(
              `http://localhost:5000/api/contact-messages/answer/${msg.id}`
            );
            if (res.data && res.data.length > 0) {
              setAnswers((prev) => ({ ...prev, [msg.id]: res.data[0] }));
            }
          } catch (e) {}
        });
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
    <div className="p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
        Gönderdiğim Mesajlar
      </h2>
      {messages.length === 0 ? (
        <p className="text-gray-500">Henüz gönderilmiş mesaj yok.</p>
      ) : (
        <ul className="space-y-6">
          {messages.map((m) => (
            <li
              key={m.id}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 flex flex-col gap-2 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center text-white font-bold text-lg shadow">
                    <span>M</span>
                  </div>
                  <span className="font-semibold text-yellow-700 text-base">
                    Mesaj
                  </span>
                </div>
                <span className="text-xs text-gray-400 font-medium">
                  {formatDate(m.created_at)}
                </span>
              </div>
              <div
                className="text-gray-800 text-base border-l-4 border-yellow-400 pl-4 py-2 bg-yellow-50 rounded-r-lg shadow-sm"
                style={{ wordBreak: "break-word" }}
              >
                {expandedMessages.includes(m.id)
                  ? m.message
                  : m.message.slice(0, 100) +
                    (m.message.length > 100 ? "..." : "")}
              </div>
              {m.message.length > 100 && (
                <button
                  className="text-yellow-600 underline text-sm mb-2 self-end"
                  onClick={() => toggleExpand(m.id)}
                >
                  {expandedMessages.includes(m.id)
                    ? "Küçült"
                    : "Devamını Göster"}
                </button>
              )}
              {/* Admin cevabı varsa göster */}
              {answers[m.id] && (
                <div className="mt-2 p-4 bg-indigo-50 border-l-4 border-indigo-500 rounded-xl shadow-sm animate-fade-in">
                  <div className="flex items-center mb-1">
                    <span className="text-xs text-indigo-700 font-semibold mr-2">
                      Admin cevabı
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatDate(answers[m.id].answered_at)}
                    </span>
                  </div>
                  <div className="text-gray-900 text-sm whitespace-pre-line">
                    {answers[m.id].answer}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ContactMessages;
