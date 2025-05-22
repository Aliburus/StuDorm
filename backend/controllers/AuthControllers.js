const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key";
const JWT_EXPIRES_IN = "1h";

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // E-posta validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email) {
    return res.status(400).json({ error: "E-posta adresi boş bırakılamaz!" });
  }
  if (!emailRegex.test(email)) {
    return res
      .status(400)
      .json({ error: "Geçerli bir e-posta adresi giriniz!" });
  }

  // Şifre validation
  if (!password) {
    return res.status(400).json({ error: "Şifre boş bırakılamaz!" });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: "Şifre en az 6 karakter olmalıdır!" });
  }

  try {
    // Kullanıcıyı e-posta ile bul
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(404).json({ error: "Kullanıcı bulunamadı!" });
    }

    // Şifre doğrulama
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Geçersiz şifre!" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        user_type: user.user_type,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    // Giriş logu
    await User.logUserAction(user.id, "LOGIN", { email: user.email });

    res.status(200).json({ message: "Giriş başarılı!", token });
  } catch (error) {
    console.error("Giriş hatası:", error);
    res.status(500).json({ error: "Giriş işlemi sırasında bir hata oluştu!" });
  }
};

const registerUser = async (req, res) => {
  const { name, surname, email, phone, password } = req.body;

  // İsim ve soyisim kontrolü
  if (!name || name.trim().length < 3) {
    return res.status(400).json({ error: "İsim en az 3 karakter olmalıdır!" });
  }
  if (!surname || surname.trim().length < 2) {
    return res
      .status(400)
      .json({ error: "Soyisim en az 2 karakter olmalıdır!" });
  }

  // İsim ve soyadı düzenleme
  const formattedName = name
    .trim()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  const formattedSurname = surname
    .trim()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  // E-posta validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email) {
    return res.status(400).json({ error: "E-posta adresi boş bırakılamaz!" });
  }
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      error: "Geçerli bir e-posta adresi giriniz (örn: ornek@mail.com)!",
    });
  }

  // Telefon numarası validation
  if (!phone) {
    return res.status(400).json({ error: "Telefon numarası boş bırakılamaz!" });
  }

  // Türk numarası kontrolü
  const turkishPhoneRegex = /^(\+90|0)?[5][0-9][0-9][1-9]([0-9]){6}$/;
  // Uluslararası numara kontrolü
  const internationalPhoneRegex = /^\+[1-9]\d{1,14}$/;

  if (!turkishPhoneRegex.test(phone) && !internationalPhoneRegex.test(phone)) {
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

  // Şifre validation
  if (!password) {
    return res.status(400).json({ error: "Şifre boş bırakılamaz!" });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: "Şifre en az 6 karakter olmalıdır!" });
  }
  if (!/[A-Z]/.test(password)) {
    return res
      .status(400)
      .json({ error: "Şifre en az bir büyük harf içermelidir!" });
  }
  if (!/[0-9]/.test(password)) {
    return res
      .status(400)
      .json({ error: "Şifre en az bir rakam içermelidir!" });
  }

  try {
    // Check if the email already exists in the database
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Bu e-posta adresi zaten kullanılıyor!" });
    }

    // Check if the phone already exists in the database
    const existingPhone = await User.findByPhone(formattedPhone);
    if (existingPhone) {
      return res
        .status(400)
        .json({ error: "Bu telefon numarası zaten kullanılıyor!" });
    }

    // Hash the password for security
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database with default 'normal' user_type
    await User.create({
      name: formattedName,
      surname: formattedSurname,
      email,
      phone: formattedPhone,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Kullanıcı başarıyla kayıt edildi! Giriş yapabilirsiniz.",
    });
  } catch (error) {
    console.error("Kayıt hatası:", error);
    res.status(500).json({
      error:
        "Kayıt işlemi sırasında bir hata oluştu! Lütfen daha sonra tekrar deneyin.",
    });
  }
};

const logoutUser = async (req, res) => {
  try {
    // Kullanıcıyı token'dan bul
    const token = req.headers.authorization?.split(" ")[1];
    let userId = null;
    if (token) {
      try {
        const decoded = jwt.verify(token, JWT_SECRET);
        userId = decoded.id;
      } catch (e) {}
    }
    if (userId) {
      await User.logUserAction(userId, "LOGOUT", {});
    }
    res.status(200).json({ message: "Çıkış başarılı!" });
  } catch (error) {
    console.error("Çıkış hatası:", error);
    res.status(500).json({ error: "Çıkış işlemi sırasında bir hata oluştu!" });
  }
};

const forgotPassword = async (req, res) => {
  const { email, newPassword, confirmPassword } = req.body;

  try {
    const user = await User.findByEmail(email);
    if (!user) {
      return res
        .status(404)
        .json({ error: "Bu e-posta adresi ile kayıtlı kullanıcı bulunamadı." });
    }

    // Şifre kontrolü
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ error: "Şifreler eşleşmiyor!" });
    }

    // Şifreyi hashle
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Şifreyi güncelle
    await User.updateProfile(user.id, { password: hashedPassword });

    res.status(200).json({
      message: "Şifreniz başarıyla güncellendi.",
    });
  } catch (error) {
    console.error("Şifre sıfırlama hatası:", error);
    res
      .status(500)
      .json({ error: "Şifre sıfırlama işlemi sırasında bir hata oluştu." });
  }
};

const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    // Token'ı doğrula
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.getUserById(decoded.id);

    if (!user) {
      return res.status(404).json({ error: "Kullanıcı bulunamadı." });
    }

    // Yeni şifreyi hashle
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Şifreyi güncelle
    await User.updateProfile(user.id, {
      password: hashedPassword,
      resetToken: null, // Token'ı temizle
    });

    res.status(200).json({ message: "Şifreniz başarıyla güncellendi." });
  } catch (error) {
    console.error("Şifre güncelleme hatası:", error);
    res
      .status(500)
      .json({ error: "Şifre güncelleme işlemi sırasında bir hata oluştu." });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
};
