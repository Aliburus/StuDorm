// models/userModel.js
const db = require("../config/db"); // Veritabanı bağlantısını import et

// Kullanıcı ID'sine göre kullanıcıyı al
const getUserById = async (userId) => {
  try {
    const [rows] = await db.execute("SELECT * FROM users WHERE id = ?", [
      userId,
    ]);
    if (rows.length === 0) {
      return null; // Kullanıcı bulunmazsa null döndür
    }
    return rows[0]; // İlk satırı döndür
  } catch (err) {
    console.error("Veritabanı hatası:", err);
    throw new Error("Veritabanı hatası");
  }
};

// Kullanıcı profilini güncelle
const updateProfile = async (userId, updateData) => {
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

    const updatedUser = await getUserById(userId);
    return updatedUser;
  } catch (error) {
    console.error("Profil güncelleme hatası:", error);
    throw new Error("Profil güncellenirken bir hata oluştu.");
  }
};

// Kullanıcıyı premium yap
const upgradeToPremium = async (userId) => {
  try {
    const [result] = await db.query(
      `UPDATE users SET user_type = 'premium' WHERE id = ?`,
      [userId] // Kullanıcıyı premium yapıyoruz
    );

    if (result.affectedRows === 0) {
      throw new Error("Kullanıcı bulunamadı.");
    }

    // Güncellenmiş kullanıcıyı tekrar çek
    const updatedUser = await getUserById(userId);
    return updatedUser;
  } catch (error) {
    console.error("Premium yapma hatası:", error);
    throw new Error("Premium yapılırken bir hata oluştu.");
  }
};

module.exports = { getUserById, updateProfile, upgradeToPremium };
