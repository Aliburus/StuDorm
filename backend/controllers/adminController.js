// controllers/adminController.js
const AdminModel = require("../models/AdminModel"); // `require` ile içe aktar
const User = require("../models/User"); // Kullanıcı modelini içe aktar
const bcrypt = require("bcrypt"); // Bcrypt'i içe aktar
module.exports.getUsers = async (req, res) => {
  try {
    const users = await AdminModel.getAllUsers();
    await User.logUserAction(req.user.id, "GET_USERS", { count: users.length });
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports.getAllListings = async (req, res) => {
  try {
    const listings = await AdminModel.getAllListings();
    await User.logUserAction(req.user.id, "GET_ALL_LISTINGS", {
      count: listings.length,
    });
    res.status(200).json(listings);
  } catch (err) {
    console.error("Error fetching listings:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports.getOverviewStats = async (req, res) => {
  try {
    const stats = await AdminModel.getOverviewStats();
    await User.logUserAction(req.user.id, "GET_OVERVIEW_STATS", { stats });
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
    await User.logUserAction(req.user.id, "DELETE_LISTING", { source, id });
    res.status(200).json({ message: "Listing deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.updateListingDetails = async (req, res) => {
  try {
    const { source, id } = req.params;
    await AdminModel.updateListingDetails(source, id, req.body);
    await User.logUserAction(req.user.id, "UPDATE_LISTING_DETAILS", {
      source,
      id,
      details: req.body,
    });
    res.status(200).json({ message: "Listing details updated" });
  } catch (err) {
    console.error("UpdateDetails error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.getAllPosts = async (req, res) => {
  try {
    const posts = await AdminModel.getAllPosts();
    await User.logUserAction(req.user.id, "GET_ALL_POSTS", {
      count: posts.length,
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.getUserById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await AdminModel.deleteUser(id);

    // Silme işlemini logla
    await User.logUserAction(req.user.id, "USER_DELETED", {
      deletedUserId: id,
      deletedUserName: user.name,
      deletedUserEmail: user.email,
    });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports.changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.getUserById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match) {
      return res.status(401).json({ error: "Current password is incorrect" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.updateProfile(userId, { password: hashedPassword });
    await User.logUserAction(userId, "ADMIN_PASSWORD_CHANGE", { userId });
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ error: `Internal Server Error: ${error.message}` });
  }
};
module.exports.updateUserType = async (req, res) => {
  const { user_type } = req.body;
  const userId = req.params.id;
  const adminId = req.user.id;

  try {
    const admin = await User.getUserById(adminId);
    if (!admin || admin.user_type !== "admin") {
      return res
        .status(403)
        .json({ error: "Sadece adminler kullanıcı tipi değiştirebilir" });
    }

    if (!["normal", "admin", "premium"].includes(user_type)) {
      return res.status(400).json({ error: "Geçersiz kullanıcı tipi" });
    }

    const user = await User.getUserById(userId);
    if (!user) {
      return res.status(404).json({ error: "Kullanıcı bulunamadı" });
    }

    const updatedUser = await User.updateUserType(userId, user_type);

    // Kullanıcı tipi değişikliğini logla
    await User.logUserAction(adminId, "USER_TYPE_CHANGED", {
      targetUserId: userId,
      targetUserName: user.name,
      targetUserEmail: user.email,
      oldUserType: user.user_type,
      newUserType: user_type,
    });

    // Premium bitiş kontrolü
    await User.checkAndDowngradeExpiredPremiums();

    res.status(200).json({
      message: "Kullanıcı tipi başarıyla güncellendi",
      updatedUser,
    });
  } catch (error) {
    console.error("Kullanıcı tipi güncellenirken hata:", error);
    res.status(500).json({ error: `Sunucu hatası: ${error.message}` });
  }
};

module.exports.deleteForumPost = async (req, res) => {
  try {
    const { id } = req.params;
    await AdminModel.deleteForumPost(id);
    await User.logUserAction(req.user.id, "DELETE_FORUM_POST", { postId: id });
    res.status(200).json({ message: "Post başarıyla silindi" });
  } catch (error) {
    console.error("Post silinirken hata:", error);
    res.status(500).json({ message: "Post silinirken bir hata oluştu" });
  }
};

module.exports.getPremiumRevenueByMonth = async (req, res) => {
  try {
    const data = await AdminModel.getPremiumRevenueByMonth();
    await User.logUserAction(req.user.id, "GET_PREMIUM_REVENUE_BY_MONTH", {
      data,
    });
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching premium revenue by month:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.getPremiumRevenueByCity = async (req, res) => {
  try {
    const data = await AdminModel.getPremiumRevenueByCity();
    await User.logUserAction(req.user.id, "GET_PREMIUM_REVENUE_BY_CITY", {
      data,
    });
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching premium revenue by city:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.getListingStatsByCity = async (req, res) => {
  try {
    const stats = await AdminModel.getListingStatsByCity();
    await User.logUserAction(req.user.id, "GET_LISTING_STATS_BY_CITY", {
      stats,
    });
    res.json(stats);
  } catch (error) {
    console.error("Şehir bazlı ilan istatistikleri alınamadı:", error);
    res
      .status(500)
      .json({ message: "Şehir bazlı ilan istatistikleri alınamadı" });
  }
};

module.exports.getUserAndListingTrendsByMonth = async (req, res) => {
  try {
    const data = await AdminModel.getUserAndListingTrendsByMonth();
    await User.logUserAction(
      req.user.id,
      "GET_USER_AND_LISTING_TRENDS_BY_MONTH",
      { data }
    );
    res.status(200).json(data);
  } catch (error) {
    console.error("Trend verileri alınamadı:", error);
    res.status(500).json({ error: "Trend verileri alınamadı" });
  }
};

module.exports.getUserLogs = async (req, res) => {
  try {
    const { userId } = req.query;
    const logs = await User.getUserLogs(userId);
    await User.logUserAction(req.user.id, "GET_USER_LOGS", { userId });
    res.status(200).json(logs);
  } catch (error) {
    console.error("Error fetching user logs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
