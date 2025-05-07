// controllers/adminController.js
const AdminModel = require("../models/AdminModel"); // `require` ile içe aktar

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
module.exports.getReportedContent = async (req, res) => {
  try {
    const reportedContent = await AdminModel.getReportedContent(); // Modelden verileri al
    res.status(200).json(reportedContent); // JSON olarak döndür
  } catch (error) {
    console.error("Error fetching reported content:", error);
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
