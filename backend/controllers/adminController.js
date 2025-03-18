// controllers/adminController.js
const AdminModel = require("../models/AdminModel"); // `require` ile içe aktar

module.exports = {
  getUsers: async (req, res) => {
    try {
      const users = await AdminModel.getAllUsers(); // AdminModel'den kullanıcıları al
      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
