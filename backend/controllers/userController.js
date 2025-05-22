// controllers/userController.js
const userModel = require("../models/User"); // userModel'i import et
const bcrypt = require("bcrypt"); // bcrypt'i import et
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
const updateUserProfile = async (req, res) => {
  try {
    const { name, surname, email, oldPassword, newPassword } = req.body;
    const userId = req.user.id;

    const user = await userModel.getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Eski şifre doğrulaması
    if (oldPassword && !(await bcrypt.compare(oldPassword, user.password))) {
      return res.status(400).json({ message: "Invalid old password" });
    }

    // Yeni şifreyi hash'leyip güncelle
    let hashedPassword = user.password;
    if (newPassword) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(newPassword, salt);
      await userModel.logUserAction(userId, "PASSWORD_CHANGE", {
        oldEmail: user.email,
        newEmail: email,
      });
    }

    // Kullanıcı bilgilerini güncelle
    user.name = name || user.name;
    user.surname = surname || user.surname;
    user.email = email || user.email;
    user.password = hashedPassword;

    // Kullanıcıyı veritabanında güncelle
    await userModel.updateProfile(user.id, {
      name: user.name,
      surname: user.surname,
      email: user.email,
      password: user.password,
    });

    // Profil güncelleme logunu kaydet
    await userModel.logUserAction(userId, "PROFILE_UPDATE", {
      oldName: user.name,
      oldSurname: user.surname,
      oldEmail: user.email,
      newName: name,
      newSurname: surname,
      newEmail: email,
    });

    return res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while updating user",
      error: error.message,
    });
  }
};

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

const getUserById = async (req, res) => {
  try {
    const user = await userModel.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "Kullanıcı bulunamadı" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Veritabanı hatası" });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  upgradeToPremium,
  accessPremiumContent,
  getUserById,
};
