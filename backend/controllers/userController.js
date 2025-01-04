// controllers/userController.js
const userModel = require("../models/userModel"); // userModel'i import et

const getUserProfile = async (req, res) => {
  const userId = req.user.id; // Token'den alınan kullanıcı ID'si

  try {
    const user = await userModel.getUserById(userId);
    if (!user) {
      return res.status(404).json({ error: "Kullanıcı bulunamadı" });
    }
    res.json(user); // Kullanıcı bilgilerini döndür
  } catch (err) {
    console.error("Hata:", err); // Hata mesajını logla
    return res.status(500).json({ error: "Veritabanı hatası" });
  }
};

module.exports = { getUserProfile };
