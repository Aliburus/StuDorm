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
    const { password } = updateData;

    try {
      const [result] = await db.query(
        `UPDATE users SET password = ? WHERE id = ?`,
        [password, userId]
      );

      if (result.affectedRows === 0) {
        throw new Error("User not found");
      }

      // Güncellenmiş kullanıcıyı tekrar çek
      const updatedUser = await User.getUserById(userId);
      return updatedUser;
    } catch (error) {
      console.error("Profile update error:", error);
      throw new Error("Error updating profile");
    }
  },

  upgradeToPremium: async (userId) => {
    try {
      const [result] = await db.query(
        `UPDATE users SET user_type = 'premium' WHERE id = ?`,
        [userId] // Kullanıcıyı premium yapıyoruz
      );

      if (result.affectedRows === 0) {
        throw new Error("Kullanıcı bulunamadı.");
      }

      // Güncellenmiş kullanıcıyı tekrar çek
      const updatedUser = await User.getUserById(userId);
      return updatedUser;
    } catch (error) {
      console.error("Premium yapma hatası:", error);
      throw new Error("Premium yapılırken bir hata oluştu.");
    }
  },

  getUserById: async (userId) => {
    try {
      const [rows] = await db.execute("SELECT * FROM users WHERE id = ?", [
        userId,
      ]);
      if (rows.length === 0) {
        return null; // Kullanıcı bulunamadıysa null döndür
      }
      return rows[0];
    } catch (err) {
      console.error("Veritabanı hatası:", err);
      throw new Error("Veritabanı hatası");
    }
  },
  updateUserType: async (userId, newUserType) => {
    try {
      const [result] = await db.query(
        `UPDATE users SET user_type = ? WHERE id = ?`,
        [newUserType, userId]
      );

      if (result.affectedRows === 0) {
        throw new Error("User not found");
      }

      // Güncellenmiş kullanıcıyı tekrar çek
      const updatedUser = await User.getUserById(userId);
      return updatedUser;
    } catch (error) {
      console.error("Error updating user type:", error);
      throw new Error("Error updating user type");
    }
  },
};

module.exports = User;
