const bcrypt = require("bcrypt");
const User = require("../models/User");

const registerUser = async (req, res) => {
  console.log("Gelen veri:", req.body);
  const { name, surname, email, password } = req.body;

  if (!password || password.length < 6) {
    return res.status(400).json({ error: "Geçersiz şifre!" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await User.create({
      name,
      surname,
      email,
      password: hashedPassword,
    });
    console.log("Kayıt başarılı:", result);
    res.status(201).json({ message: "Kullanıcı başarıyla kayıt olundu!" });
  } catch (error) {
    console.error("Hata:", error);
    res
      .status(500)
      .json({ error: "Kayıt işlemi başarısız!", details: error.message });
  }
};

module.exports = { registerUser };
