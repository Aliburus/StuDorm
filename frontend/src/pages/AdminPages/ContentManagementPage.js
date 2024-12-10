import React, { useState } from "react";

// Örnek duyuru ve rehber verisi (gerçek dünyada bu veriler API'den veya veritabanından alınabilir)
const announcementsData = [
  {
    id: 1,
    title: "Bakım Çalışması",
    content: "Site bakım çalışması yapılacaktır.",
  },
  {
    id: 2,
    title: "Yurt Seçimi Rehberi",
    content: "Yurt seçimi yaparken dikkat edilmesi gerekenler...",
  },
];

const faqData = [
  {
    id: 1,
    question: "Yurt seçiminde nelere dikkat etmeliyim?",
    answer:
      "Yurt seçerken lokasyon, fiyat, imkanlar gibi faktörlere dikkat edin.",
  },
  {
    id: 2,
    question: "Oda arkadaşı seçimi nasıl yapılır?",
    answer: "Oda arkadaşı seçimi yaparken kişisel tercihler ve uyum önemlidir.",
  },
];

const ContentManagementPage = () => {
  const [announcements, setAnnouncements] = useState(announcementsData);
  const [faqs, setFaqs] = useState(faqData);

  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    content: "",
  });
  const [newFaq, setNewFaq] = useState({ question: "", answer: "" });

  const handleAddAnnouncement = (e) => {
    e.preventDefault();
    setAnnouncements([
      ...announcements,
      { ...newAnnouncement, id: announcements.length + 1 },
    ]);
    setNewAnnouncement({ title: "", content: "" });
  };

  const handleAddFaq = (e) => {
    e.preventDefault();
    setFaqs([...faqs, { ...newFaq, id: faqs.length + 1 }]);
    setNewFaq({ question: "", answer: "" });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Content Management</h1>
      <p className="mb-6">
        Manage announcements, blog posts, and FAQs for your site.
      </p>

      {/* Duyuru Ekleme Bölümü */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Announcement</h2>
        <form
          onSubmit={handleAddAnnouncement}
          className="bg-white p-4 rounded-lg shadow-md mb-6"
        >
          <div className="mb-4">
            <label className="block mb-2">Title</label>
            <input
              type="text"
              value={newAnnouncement.title}
              onChange={(e) =>
                setNewAnnouncement({
                  ...newAnnouncement,
                  title: e.target.value,
                })
              }
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter announcement title"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Content</label>
            <textarea
              value={newAnnouncement.content}
              onChange={(e) =>
                setNewAnnouncement({
                  ...newAnnouncement,
                  content: e.target.value,
                })
              }
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter announcement content"
              rows="4"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-lg"
          >
            Add Announcement
          </button>
        </form>
      </div>

      {/* Duyuru Listesi */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Announcements List</h2>
        <ul className="bg-white p-4 rounded-lg shadow-md">
          {announcements.map((announcement) => (
            <li key={announcement.id} className="mb-4 border-b pb-2">
              <h3 className="text-lg font-semibold">{announcement.title}</h3>
              <p>{announcement.content}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Sıkça Sorulan Sorular (SSS) Bölümü */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New FAQ</h2>
        <form
          onSubmit={handleAddFaq}
          className="bg-white p-4 rounded-lg shadow-md mb-6"
        >
          <div className="mb-4">
            <label className="block mb-2">Question</label>
            <input
              type="text"
              value={newFaq.question}
              onChange={(e) =>
                setNewFaq({ ...newFaq, question: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter question"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Answer</label>
            <textarea
              value={newFaq.answer}
              onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter answer"
              rows="4"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-lg"
          >
            Add FAQ
          </button>
        </form>
      </div>

      {/* Sıkça Sorulan Sorular Listesi */}
      <div>
        <h2 className="text-xl font-semibold mb-4">FAQ List</h2>
        <ul className="bg-white p-4 rounded-lg shadow-md">
          {faqs.map((faq) => (
            <li key={faq.id} className="mb-4 border-b pb-2">
              <h3 className="text-lg font-semibold">{faq.question}</h3>
              <p>{faq.answer}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ContentManagementPage;
