const db = require("../config/db");

const Contact = {
  create: async ({ email, message }) => {
    const [result] = await db
      .query(
        `INSERT INTO contact_messages 
         (email, message, created_at)
       VALUES (?, ?, ?)`,
        [email, message, new Date()]
      )
      .catch((err) => {
        console.error("Veritabanı hatası:", err);
        throw new Error("Veritabanı hatası.");
      });
    if (result.affectedRows === 0) {
      throw new Error("Mesaj kaydedilemedi.");
    }
    return result;
  },
  getAllMessages: async () => {
    const [rows] = await db.query("SELECT * FROM contact_messages");
    return rows;
  },
  getByEmail: async (email) => {
    const [rows] = await db.query(
      `SELECT * FROM contact_messages WHERE email = ? ORDER BY created_at DESC`,
      [email]
    );
    return rows;
  },
};

module.exports = Contact;
