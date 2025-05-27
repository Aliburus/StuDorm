// controllers/userController.js
const userModel = require("../models/User"); // userModel'i import et
const bcrypt = require("bcrypt"); // bcrypt'i import et
const db = require("../config/db");
const getUserProfile = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await userModel.getUserById(userId);
    if (!user) {
      return res.status(404).json({ error: "Kullanıcı bulunamadı" });
    }

    await userModel.logUserAction(userId, "GET_USER_PROFILE", { userId });
    res.json({
      id: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      phone: user.phone,
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
    await userModel.logUserAction(userId, "ACCESS_PREMIUM_CONTENT", { userId });
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
  const userId = req.user.id;
  const paymentStatus = req.body.paymentStatus;

  if (paymentStatus !== "successful") {
    return res.status(400).json({ error: "Ödeme başarısız" });
  }

  try {
    // O anki premium fiyatını çek
    const [[benefit]] = await db.query(
      "SELECT price FROM premium_benefits ORDER BY id DESC LIMIT 1"
    );
    const premiumPrice = benefit?.price || 0;

    // Kullanıcıyı premium yap
    const updatedUser = await userModel.upgradeToPremium(userId, premiumPrice);
    await userModel.logUserAction(userId, "UPGRADE_TO_PREMIUM", {
      userId,
      premiumPrice,
    });
    res.json({ message: "Hesabınız premium olmuştur", user: updatedUser });
  } catch (err) {
    console.error("Premium yapma hatası:", err);
    return res.status(500).json({ error: "Veritabanı hatası" });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await userModel.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "Kullanıcı bulunamadı" });
    }
    await userModel.logUserAction(req.user.id, "GET_USER_BY_ID", {
      userId: req.params.id,
    });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Veritabanı hatası" });
  }
};

const checkAdEligibility = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { adType } = req.query;
    let table;
    if (adType === "parttime" || adType === "parttimeads")
      table = "parttimeads";
    else if (adType === "yurt" || adType === "dorm" || adType === "yurtads")
      table = "yurtads";
    else if (adType === "intern" || adType === "interns") table = "interns";
    else {
      return res
        .status(400)
        .json({ eligible: false, message: "Geçersiz ilan tipi!" });
    }

    // Kullanıcıyı çek
    const [userRows] = await db.query(
      "SELECT id, user_type, premium_start, premium_end FROM users WHERE id = ?",
      [userId]
    );
    const user = userRows[0];
    if (!user) {
      return res
        .status(404)
        .json({ eligible: false, message: "Kullanıcı bulunamadı!" });
    }
    const now = new Date();
    let isPremium = false;
    if (user.premium_start && user.premium_end) {
      const start = new Date(user.premium_start);
      const end = new Date(user.premium_end);
      isPremium = now >= start && now <= end;
    }

    // Son 6 ayda eklenen ilan sayısı
    const [countRows] = await db.query(
      `SELECT COUNT(*) as count FROM ${table} WHERE user_id = ? AND created_at > DATE_SUB(NOW(), INTERVAL 6 MONTH)`,
      [userId]
    );
    const adCount = countRows[0].count;

    let isEligible = false;
    let message = "";
    if (isPremium) {
      isEligible = true;
    } else {
      isEligible = adCount < 1;
      if (!isEligible && adCount >= 1)
        message = "Normal üyeler sadece 1 ilan ekleyebilir. Premium olun!";
      else if (!isPremium) message = "Premium üye değilsiniz.";
    }

    await userModel.logUserAction(userId, "CHECK_AD_ELIGIBILITY", {
      adType,
      isEligible,
      isPremium,
      adCount,
    });
    return res.status(200).json({
      eligible: isEligible,
      message,
      isPremium,
    });
  } catch (error) {
    res.status(500).json({ eligible: false, message: "Sunucu hatası!" });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  upgradeToPremium,
  accessPremiumContent,
  getUserById,
  checkAdEligibility,
};
