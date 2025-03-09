// models/Intern.js
const db = require("../config/db");

const InternAd = {
  getAll: () => {
    return db.query("SELECT * FROM interns"); // Veritabanındaki tablo adını düzgün yazdığınızdan emin olun
  },
  getById: (id) => {
    return db.query("SELECT * FROM interns WHERE id = ?", [id]);
  },
  create: (internData) => {
    return db.query(
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
  },
  update: (id, internData) => {
    return db.query(
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
  },
  delete: (id) => {
    return db.query("DELETE FROM interns WHERE id = ?", [id]);
  },
};

module.exports = InternAd;
