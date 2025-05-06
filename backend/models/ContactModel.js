const db = require("../config/db");

const Contact = {
  create: async ({ user_id, name, surname, email, message }) => {
    try {
      const [result] = await db.query(
        "INSERT INTO contact_messages (user_id, name, surname, email, message, created_at) VALUES (?, ?, ?, ?, ?, ?)",
        [user_id, name, surname, email, message, new Date()]
      );
      return result;
    } catch (error) {
      console.error("Mesaj kaydı sırasında hata:", error);
      throw new Error("Mesaj kaydedilemedi.");
    }
  },
  getAllMessages: async () => {
    try {
      const [rows] = await db.query("SELECT * FROM contact_messages");
      return rows;
    } catch (error) {
      console.error("Mesajları alma hatası:", error);
      throw new Error("Mesajları alırken hata oluştu.");
    }
  },
};

module.exports = Contact;
