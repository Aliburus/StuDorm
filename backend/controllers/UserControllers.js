const updateProfile = async (req, res) => {
  const { name, surname, phone } = req.body;
  const userId = req.user.id;

  try {
    const updates = {};

    // İsim validasyonu
    if (name) {
      if (name.trim().length < 3) {
        return res
          .status(400)
          .json({ error: "İsim en az 3 karakter olmalıdır!" });
      }
      updates.name = name
        .trim()
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");
    }

    // Soyad validasyonu
    if (surname) {
      if (surname.trim().length < 2) {
        return res
          .status(400)
          .json({ error: "Soyisim en az 2 karakter olmalıdır!" });
      }
      updates.surname = surname
        .trim()
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");
    }

    // Telefon validasyonu
    if (phone) {
      const turkishPhoneRegex = /^(\+90|0)?[5][0-9][0-9][1-9]([0-9]){6}$/;
      const internationalPhoneRegex = /^\+[1-9]\d{1,14}$/;

      if (
        !turkishPhoneRegex.test(phone) &&
        !internationalPhoneRegex.test(phone)
      ) {
        return res.status(400).json({
          error:
            "Geçerli bir telefon numarası giriniz:\nTürk numarası: +905551234567 veya 05551234567\nUluslararası numara: +1234567890",
        });
      }

      // Telefon numarasını WhatsApp formatına dönüştür
      let formattedPhone = phone;
      if (phone.startsWith("0")) {
        formattedPhone = "90" + phone.substring(1);
      } else if (phone.startsWith("+")) {
        formattedPhone = phone.substring(1);
      }

      // Telefon numarası benzersizlik kontrolü
      const existingPhone = await User.findByPhone(formattedPhone);
      if (existingPhone && existingPhone.id !== userId) {
        return res
          .status(400)
          .json({ error: "Bu telefon numarası zaten kullanılıyor!" });
      }

      updates.phone = formattedPhone;
    }

    // Değişiklik yoksa güncelleme yapma
    if (Object.keys(updates).length === 0) {
      return res
        .status(400)
        .json({ error: "Güncellenecek bir değişiklik yok!" });
    }

    const updatedUser = await User.updateProfile(userId, updates);
    res
      .status(200)
      .json({ message: "Profil başarıyla güncellendi!", user: updatedUser });
  } catch (error) {
    console.error("Profil güncelleme hatası:", error);
    res.status(500).json({ error: "Profil güncellenirken bir hata oluştu!" });
  }
};

const changePassword = async (req, res) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;
  const userId = req.user.id;

  try {
    // Mevcut şifre kontrolü
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "Kullanıcı bulunamadı!" });
    }

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Mevcut şifre yanlış!" });
    }

    // Yeni şifre validasyonu
    if (!newPassword) {
      return res.status(400).json({ error: "Yeni şifre boş bırakılamaz!" });
    }
    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({ error: "Şifre en az 6 karakter olmalıdır!" });
    }
    if (!/[A-Z]/.test(newPassword)) {
      return res
        .status(400)
        .json({ error: "Şifre en az bir büyük harf içermelidir!" });
    }
    if (!/[0-9]/.test(newPassword)) {
      return res
        .status(400)
        .json({ error: "Şifre en az bir rakam içermelidir!" });
    }

    // Şifre tekrarı kontrolü
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ error: "Şifreler eşleşmiyor!" });
    }

    // Yeni şifreyi hashle
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Şifreyi güncelle
    await User.updateProfile(userId, { password: hashedPassword });

    res.status(200).json({ message: "Şifre başarıyla güncellendi!" });
  } catch (error) {
    console.error("Şifre değiştirme hatası:", error);
    res.status(500).json({ error: "Şifre değiştirilirken bir hata oluştu!" });
  }
};

const deleteUser = async (req, res) => {
  const userId = req.user.id;

  try {
    // Kullanıcının ilanlarını sil
    await Post.deleteUserPosts(userId);

    // Kullanıcının mesajlarını sil
    await Message.deleteUserMessages(userId);

    // Kullanıcıyı sil
    await User.delete(userId);

    res
      .status(200)
      .json({ message: "Hesabınız ve tüm verileriniz başarıyla silindi!" });
  } catch (error) {
    console.error("Kullanıcı silme hatası:", error);
    res.status(500).json({ error: "Hesap silinirken bir hata oluştu!" });
  }
};

const checkAdEligibility = async (req, res) => {
  try {
    const userId = req.user.id;
    const { adType } = req.query; // 'parttime', 'yurt', 'intern'
    let table;
    if (adType === "parttime") table = "parttimeads";
    else if (adType === "yurt") table = "yurtads";
    else if (adType === "intern") table = "interns";
    else
      return res
        .status(400)
        .json({ eligible: false, message: "Geçersiz ilan tipi!" });

    // Kullanıcıyı çek
    const [userRows] = await db.query(
      "SELECT premium_start, premium_end FROM users WHERE id = ?",
      [userId]
    );
    const user = userRows[0];
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

    const isEligible =
      (isPremium && adCount < 6) || (!isPremium && adCount < 1);

    return res.status(200).json({
      eligible: isEligible,
      message: isEligible
        ? ""
        : isPremium
        ? "6 ayda en fazla 6 ilan ekleyebilirsiniz (Premium)!"
        : "6 ayda en fazla 1 ilan ekleyebilirsiniz (Normal)!",
      isPremium,
    });
  } catch (error) {
    console.error("Eligibility kontrol hatası:", error);
    res.status(500).json({ eligible: false, message: "Sunucu hatası!" });
  }
};

module.exports = {
  updateProfile,
  changePassword,
  deleteUser,
  checkAdEligibility,
};
