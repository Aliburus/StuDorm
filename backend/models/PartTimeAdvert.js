const db = require("../config/db");

const PartTimeAdvert = {
  create: async (advert) => {
    try {
      const {
        title,
        category,
        province,
        district,
        contact,
        description,
        duration,
        requirements,
        price, // Add price here
        user_id,
      } = advert;

      const query = `
        INSERT INTO parttimeads 
        (title, category, province, district, contact, description, duration, requirements, price, created_at, user_id) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?)
      `;

      const [result] = await db.query(query, [
        title,
        category,
        province,
        district,
        contact,
        description,
        duration,
        requirements,
        price, // Pass price value here
        user_id,
      ]);

      return result.insertId;
    } catch (err) {
      throw err;
    }
  },

  getAll: async () => {
    try {
      const query = `
        SELECT id, title, category, province, district, contact, description, duration, requirements, price, created_at, user_id 
        FROM parttimeads 
        ORDER BY created_at DESC
      `;
      const [rows] = await db.query(query);
      return rows;
    } catch (err) {
      throw err;
    }
  },

  getById: async (id) => {
    try {
      const query =
        "SELECT id, title, category, province, district, contact, description, duration, requirements, price, created_at, user_id FROM parttimeads WHERE id = ?";
      const [rows] = await db.query(query, [id]);
      return rows;
    } catch (err) {
      throw err;
    }
  },

  deleteById: async (id) => {
    try {
      const query = "DELETE FROM parttimeads WHERE id = ?";
      const [result] = await db.query(query, [id]);
      return result.affectedRows;
    } catch (err) {
      throw err;
    }
  },
};

module.exports = PartTimeAdvert;
