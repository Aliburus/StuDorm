// models/AdminModel.js
const db = require("../config/db"); // `require` ile içe aktar

module.exports = {
  getAllUsers: async () => {
    const query = `SELECT id, name, surname, email, user_type, created_at FROM users`;
    const [rows] = await db.query(query);
    return rows;
  },
};
