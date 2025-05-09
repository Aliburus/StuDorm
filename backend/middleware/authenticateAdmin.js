// middleware/authenticateAdmin.js
const authenticateToken = require("./authenticateToken");

const authenticateAdmin = (req, res, next) => {
  // Token doğrulama işlemi
  authenticateToken(req, res, () => {
    // Kullanıcı türünü kontrol et
    if (req.user.user_type !== "admin") {
      return res.status(403).json({ message: "Yalnızca admin erişimi var!" });
    }
    next(); // Admin ise devam et
  });
};

module.exports = authenticateAdmin;
