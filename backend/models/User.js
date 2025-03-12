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
      throw new Error("Kullanıcı kaydı başarısız.");
    }
  },
  findByEmail: async (email) => {
    try {
      const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
        email,
      ]);
      return rows[0];
    } catch (error) {
      console.error("E-posta araması sırasında hata:", error);
      throw new Error("E-posta arama işlemi başarısız.");
    }
  },
  getUserById: async (userId) => {
    try {
      const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [
        userId,
      ]);
      return rows[0];
    } catch (err) {
      console.error("Veritabanı hatası:", err);
      throw new Error("Veritabanı hatası");
    }
  },

  updateProfile: async (userId, updateData) => {
    const { name, surname, email, password } = updateData;

    try {
      const [result] = await db.query(
        `UPDATE users 
         SET name = ?, surname = ?, email = ?, password = ?
         WHERE id = ?`,
        [name, surname, email, password, userId]
      );

      if (result.affectedRows === 0) {
        throw new Error("Kullanıcı bulunamadı.");
      }

      // Güncellenmiş kullanıcıyı tekrar çek
      const updatedUser = await User.getUserById(userId);
      return updatedUser;
    } catch (error) {
      console.error("Profil güncelleme hatası:", error);
      throw new Error("Profil güncellenirken bir hata oluştu.");
    }
  },
};

module.exports = User;
