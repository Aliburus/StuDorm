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
    const { password, resetToken } = updateData;
    const updates = [];
    const values = [];

    if (password) {
      updates.push("password = ?");
      values.push(password);
    }

    if (resetToken !== undefined) {
      updates.push("resetToken = ?");
      values.push(resetToken);
    }

    if (updates.length === 0) {
      throw new Error("No fields to update");
    }

    values.push(userId);

    try {
      const [result] = await db.query(
        `UPDATE users SET ${updates.join(", ")} WHERE id = ?`,
        values
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
};

module.exports = User;
