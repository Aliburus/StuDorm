// controllers/userController.js
const userModel = require("../models/userModel"); // userModel'i import et

const getUserProfile = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await userModel.getUserById(userId);
    if (!user) {
      return res.status(404).json({ error: "Kullanıcı bulunamadı" });
    }

    res.json({
      id: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      isPremium: user.user_type === "premium", // `user_type` premium ise true dönecek
    });
  } catch (err) {
    console.error("Hata:", err);
    return res.status(500).json({ error: "Veritabanı hatası" });
  }
};
const accessPremiumContent = async (req, res) => {
  const userId = req.user.id; // Token'den alınan kullanıcı ID'si

  try {
    // Kullanıcı bilgilerini veritabanından al
    const user = await userModel.getUserById(userId);

    // Kullanıcı bulunamadıysa hata döndür
    if (!user) {
      return res.status(404).json({ error: "Kullanıcı bulunamadı" });
    }

    // user_type alanını kontrol et
    if (user.user_type !== "premium") {
      // Kullanıcı premium değilse hata mesajı döndür
      return res.status(403).json({
        error: "Premium üyeliğiniz yok. Lütfen premium üyelik satın alınız.",
      });
    }

    // Eğer premium ise, premium içeriği döndür
    res.json({ message: "Premium içeriğe erişim sağlandı" });
  } catch (err) {
    console.error("Hata:", err.message);
    return res.status(500).json({ error: "Veritabanı hatası" });
  }
};
// Kullanıcı profilini güncelle
const updateUserProfile = async (req, res) => {
  const userId = req.user.id;
  const updateData = req.body; // Gelen veriler (name, surname, email vs.)

  try {
    const updatedUser = await userModel.updateProfile(userId, updateData);
    res.json(updatedUser); // Güncellenmiş kullanıcıyı döndür
  } catch (err) {
    console.error("Hata:", err.message);
    return res.status(500).json({ error: err.message });
  }
};

// Ödeme işlemi başarılıysa, kullanıcıyı premium yap
// Kullanıcıyı premium yap
const upgradeToPremium = async (req, res) => {
  const userId = req.user.id; // Token'den alınan kullanıcı ID'si
  const paymentStatus = req.body.paymentStatus; // Ödeme durumu (başarılı/başarısız)

  if (paymentStatus !== "successful") {
    return res.status(400).json({ error: "Ödeme başarısız" });
  }

  try {
    const updatedUser = await userModel.upgradeToPremium(userId);
    res.json({ message: "Hesabınız premium olmuştur", user: updatedUser });
  } catch (err) {
    console.error("Hata:", err.message);
    return res.status(500).json({ error: "Veritabanı hatası" });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  upgradeToPremium,
  accessPremiumContent,
};
