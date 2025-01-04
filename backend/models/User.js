const db = require("../config/db");

const User = {
  create: async ({ name, surname, email, password }) => {
    try {
      const [result] = await db.query(
        "INSERT INTO users (name, surname, email, password) VALUES (?, ?, ?, ?)",
        [name, surname, email, password]
      );
      return result;
    } catch (error) {
      console.error("Kullanıcı kaydı sırasında hata:", error);
      throw error;
    }
  },
  findByEmail: async (email) => {
    try {
      const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
        email,
      ]);
      return rows[0];
    } catch (error) {
      console.error("Email araması sırasında hata:", error);
      throw error;
    }
  },
};

module.exports = User;
