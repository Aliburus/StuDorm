// models/userModel.js
const db = require("../config/db"); // Veritabanı bağlantısını import et

const getUserById = async (userId) => {
  try {
    console.log("Kullanıcı ID'si:", userId); // Kullanıcı ID'sini logla
    const [rows] = await db.execute("SELECT * FROM users WHERE id = ?", [
      userId,
    ]);
    if (rows.length === 0) {
      console.log("Kullanıcı bulunamadı"); // Eğer kullanıcı yoksa logla
    }
    return rows[0]; // İlk satırı döndür
  } catch (err) {
    console.error("Veritabanı hatası:", err); // Veritabanı hatasını logla
    throw new Error("Veritabanı hatası");
  }
};

module.exports = { getUserById };
