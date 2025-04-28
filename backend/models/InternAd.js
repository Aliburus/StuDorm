// models/InternAd.js

const db = require("../config/db");

const InternAd = {
  // Tüm intern ilanlarını sadece rows olarak dönecek şekilde
  getAll: async () => {
    const [rows] = await db.query("SELECT * FROM interns");
    return rows;
  },

  // Belirli bir kullanıcıya ait ilanlar
  getByUserId: async (userId) => {
    const [rows] = await db.query("SELECT * FROM interns WHERE user_id = ?", [
      userId,
    ]);
    return rows;
  },

  create: async (internData) => {
    const result = await db.query(
      "INSERT INTO interns (user_id, name, category, location, contact, description, duration, requirements) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        internData.user_id,
        internData.name,
        internData.category,
        internData.location,
        internData.contact,
        internData.description,
        internData.duration,
        internData.requirements,
      ]
    );
    return result[0].insertId;
  },

  update: async (id, internData) => {
    const result = await db.query(
      "UPDATE interns SET name = ?, category = ?, location = ?, contact = ?, description = ?, duration = ?, requirements = ? WHERE id = ?",
      [
        internData.name,
        internData.category,
        internData.location,
        internData.contact,
        internData.description,
        internData.duration,
        internData.requirements,
        id,
      ]
    );
    return result[0].affectedRows;
  },

  delete: async (id) => {
    const result = await db.query("DELETE FROM interns WHERE id = ?", [id]);
    return result[0].affectedRows;
  },
};

module.exports = InternAd;
