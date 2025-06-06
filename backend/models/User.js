const db = require("../config/db");

const User = {
  create: async ({ name, surname, email, phone, password }) => {
    try {
      const [result] = await db.query(
        "INSERT INTO users (name, surname, email, phone, password) VALUES (?, ?, ?, ?, ?)",
        [name, surname, email, phone, password]
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

  findByPhone: async (phone) => {
    try {
      const [rows] = await db.query("SELECT * FROM users WHERE phone = ?", [
        phone,
      ]);
      return rows[0];
    } catch (error) {
      console.error("Telefon araması sırasında hata:", error);
      throw new Error("Telefon arama işlemi başarısız.");
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
    try {
      const fields = Object.keys(updateData)
        .map((key) => `${key} = ?`)
        .join(", ");
      const values = Object.values(updateData);
      values.push(userId);

      const sql = `UPDATE users SET ${fields} WHERE id = ?`;
      await db.query(sql, values);
      return true;
    } catch (error) {
      console.error("Profile update error:", error);
      throw new Error("Error updating profile");
    }
  },

  upgradeToPremium: async (userId, premiumPrice) => {
    try {
      const now = new Date();
      const end = new Date();
      end.setFullYear(now.getFullYear() + 1);
      const premiumStart = now.toISOString().slice(0, 19).replace("T", " ");
      const premiumEnd = end.toISOString().slice(0, 19).replace("T", " ");
      const [result] = await db.query(
        `UPDATE users SET user_type = 'premium', premium_price = ?, premium_start = ?, premium_end = ? WHERE id = ?`,
        [premiumPrice, premiumStart, premiumEnd, userId]
      );
      if (result.affectedRows === 0) {
        throw new Error("Kullanıcı bulunamadı.");
      }
      const updatedUser = await User.getUserById(userId);
      return updatedUser;
    } catch (error) {
      console.error("Premium yapma hatası:", error);
      throw new Error("Premium yapılırken bir hata oluştu.");
    }
  },

  updateUserType: async (userId, user_type) => {
    if (user_type === "premium") {
      // O anki premium fiyatını çek
      const [[benefit]] = await db.query(
        "SELECT price FROM premium_benefits ORDER BY id DESC LIMIT 1"
      );
      const premiumPrice = benefit?.price || 0;
      const now = new Date();
      const end = new Date();
      end.setFullYear(now.getFullYear() + 1);
      const premiumStart = now.toISOString().slice(0, 19).replace("T", " ");
      const premiumEnd = end.toISOString().slice(0, 19).replace("T", " ");
      await db.query(
        `UPDATE users SET user_type = 'premium', premium_price = ?, premium_start = ?, premium_end = ? WHERE id = ?`,
        [premiumPrice, premiumStart, premiumEnd, userId]
      );
    } else {
      // Normale çekiliyorsa premium alanlarını sıfırla
      await db.query(
        `UPDATE users SET user_type = ?, premium_price = NULL, premium_start = NULL, premium_end = NULL WHERE id = ?`,
        [user_type, userId]
      );
    }
    return await User.getUserById(userId);
  },

  checkAndDowngradeExpiredPremiums: async () => {
    try {
      const now = new Date().toISOString().slice(0, 19).replace("T", " ");
      await db.query(
        `UPDATE users SET user_type = 'normal', premium_start = NULL, premium_end = NULL WHERE user_type = 'premium' AND premium_end < ?`,
        [now]
      );
    } catch (error) {
      console.error("Premium bitiş kontrol hatası:", error);
    }
  },

  logUserAction: async (userId, action, details) => {
    try {
      const [result] = await db.query(
        "INSERT INTO user_logs (user_id, action, details, created_at) VALUES (?, ?, ?, NOW())",
        [userId, action, JSON.stringify(details)]
      );
      return result;
    } catch (error) {
      console.error("Log kaydı sırasında hata:", error);
      throw new Error("Log kaydı başarısız.");
    }
  },

  getUserLogs: async (userId = null) => {
    try {
      let query = `
        SELECT ul.*, u.name, u.surname, u.email 
        FROM user_logs ul 
        JOIN users u ON ul.user_id = u.id
      `;
      let params = [];

      if (userId) {
        query += " WHERE ul.user_id = ?";
        params.push(userId);
      }

      query += " ORDER BY ul.created_at DESC";

      const [rows] = await db.query(query, params);
      return rows;
    } catch (error) {
      console.error("Log kayıtları alınırken hata:", error);
      throw new Error("Log kayıtları alınamadı.");
    }
  },

  createTable: async () => {
    const sql = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        surname VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(20) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        user_type ENUM('user', 'admin') DEFAULT 'user',
        resetToken VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `;
    // ... existing code ...
  },
};

module.exports = User;
