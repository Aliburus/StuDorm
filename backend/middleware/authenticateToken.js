// middleware/authenticateToken.js
const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Bearer token'dan token'ı al

  if (!token) {
    return res.status(401).json({ message: "Token bulunamadı" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error("Token doğrulama hatası:", err); // Token doğrulama hatasını logla
      return res.status(403).json({ message: "Geçersiz token" });
    }
    req.user = user; // Kullanıcı bilgilerini ekle
    next();
  });
};

module.exports = authenticateToken;
