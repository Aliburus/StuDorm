import React, { useEffect, useState } from "react";
import { getUserMessages } from "../../services/ContactService"; // correct named import

const ContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

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
              <p>{m.message}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ContactMessages;
