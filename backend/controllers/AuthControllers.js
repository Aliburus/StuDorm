const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key";
const JWT_EXPIRES_IN = "1h";

const registerUser = async (req, res) => {
  const { name, surname, email, password } = req.body;

  if (!password || password.length < 6) {
    return res.status(400).json({ error: "Şifre en az 6 karakter olmalıdır!" });
  }

  try {
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: "Bu e-posta zaten kullanılıyor!" });
    }

    console.log("Gelen şifre:", password);

    const hashedPassword = await bcrypt.hash(password, 10); // Şifreyi hashle
    console.log("Hashlenmiş şifre:", hashedPassword);

    await User.create({ name, surname, email, password: hashedPassword });
    res.status(201).json({ message: "Kullanıcı başarıyla kayıt edildi!" });
  } catch (error) {
    console.error("Kayıt hatası:", error);
    res.status(500).json({ error: "Kayıt işlemi sırasında bir hata oluştu!" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Kullanıcıyı e-posta ile bul
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(404).json({ error: "Kullanıcı bulunamadı!" });
    }

    console.log("Gelen şifre:", password);
    console.log("Veritabanındaki şifre:", user.password);

    // Şifre doğrulama
    const isPasswordValid = await bcrypt.compare(password, user.password);

    console.log("Şifre doğrulama sonucu:", isPasswordValid);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Geçersiz şifre!" });
    }

    // JWT token oluştur
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    res.status(200).json({ message: "Giriş başarılı!", token });
  } catch (error) {
    console.error("Giriş hatası:", error);
    res.status(500).json({ error: "Giriş işlemi sırasında bir hata oluştu!" });
  }
};

const logoutUser = async (req, res) => {
  try {
    // Örneğin, frontend tarafında token silinerek çıkış yapılır.
    res.status(200).json({ message: "Çıkış başarılı!" });
  } catch (error) {
    console.error("Çıkış hatası:", error);
    res.status(500).json({ error: "Çıkış işlemi sırasında bir hata oluştu!" });
  }
};

module.exports = { registerUser, loginUser, logoutUser };
