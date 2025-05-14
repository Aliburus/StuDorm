// controllers/adminController.js
const AdminModel = require("../models/AdminModel"); // `require` ile içe aktar
const User = require("../models/User"); // Kullanıcı modelini içe aktar
const bcrypt = require("bcrypt"); // Bcrypt'i içe aktar
module.exports.getUsers = async (req, res) => {
  try {
    const users = await AdminModel.getAllUsers(); // AdminModel'den kullanıcıları al
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports.getAllListings = async (req, res) => {
  try {
    const listings = await AdminModel.getAllListings();
    res.status(200).json(listings);
  } catch (err) {
    console.error("Error fetching listings:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports.getOverviewStats = async (req, res) => {
  try {
    const stats = await AdminModel.getOverviewStats();
    res.status(200).json(stats);
  } catch (error) {
    console.error("Error fetching overview stats:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports.deleteListing = async (req, res) => {
  try {
    const { source, id } = req.params;
    await AdminModel.deleteListing(source, id);
    res.status(200).json({ message: "Listing deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.updateListingDetails = async (req, res) => {
  try {
    const { source, id } = req.params;
    // body’de tüm güncellenmiş alanlar geliyor
    await AdminModel.updateListingDetails(source, id, req.body);
    res.status(200).json({ message: "Listing details updated" });
  } catch (err) {
    console.error("UpdateDetails error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.getAllPosts = async (req, res) => {
  try {
    const posts = await AdminModel.getAllPosts(); // Modelden verileri al
    res.status(200).json(posts); // JSON olarak döndür
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params; // Kullanıcı ID'sini al
    await AdminModel.deleteUser(id); // Modelden silme işlemini yap
    res.status(200).json({ message: "User deleted successfully" }); // Başarılı yanıt döndür
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal Server Error" }); // Hata durumunda yanıt döndür
  }
};
module.exports.changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user.id; // Admin ID'sini JWT'den alıyoruz

  try {
    // MySQL ile kullanıcıyı ID ile bul
    const user = await User.getUserById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Mevcut şifreyi kontrol et
    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match) {
      return res.status(401).json({ error: "Current password is incorrect" });
    }

    // Yeni şifreyi hashle
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Yeni şifreyi kaydetmek için SQL sorgusu kullan
    await User.updateProfile(userId, { password: hashedPassword });

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ error: `Internal Server Error: ${error.message}` });
  }
};
module.exports.updateUserType = async (req, res) => {
  const { user_type } = req.body; // body’den sadece yeni tipi alıyoruz
  const userId = req.params.id; // URL parametresinden id’yi çekiyoruz
  const adminId = req.user.id; // JWT’den gelen admin id

  try {
    // Sadece admin’lerin bu işlemi yapmasına izin ver
    const admin = await User.getUserById(adminId);
    if (!admin || admin.user_type !== "admin") {
      return res
        .status(403)
        .json({ error: "Sadece adminler kullanıcı tipi değiştirebilir" });
    }

    // Geçerli tip mi kontrol et
    if (!["normal", "admin"].includes(user_type)) {
      return res.status(400).json({ error: "Geçersiz kullanıcı tipi" });
    }

    // Veritabanında güncelle
    const updatedUser = await User.updateUserType(userId, user_type);

    if (!updatedUser) {
      return res.status(404).json({ error: "Kullanıcı bulunamadı" });
    }

    res.status(200).json({
      message: "Kullanıcı tipi başarıyla güncellendi",
      updatedUser,
    });
  } catch (error) {
    console.error("Kullanıcı tipi güncellenirken hata:", error);
    res.status(500).json({ error: `Sunucu hatası: ${error.message}` });
  }
};
