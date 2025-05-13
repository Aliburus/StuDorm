// middleware/authenticateAdmin.js
const authenticateToken = require("./authenticateToken");

const authenticateAdmin = (req, res, next) => {
  authenticateToken(req, res, () => {
    console.log("User:", req.user); // Admin kontrolünden önce user'ı konsola yazdırın
    if (req.user.user_type !== "admin") {
      return res.status(403).json({ message: "Yalnızca admin erişimi var!" });
    }
    next(); // Admin ise devam et
  });
};

module.exports = authenticateAdmin;
