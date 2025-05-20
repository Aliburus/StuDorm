// models/InternAd.js

const db = require("../config/db");

const InternAd = {
  // Tüm intern ilanlarını döner
  getAll: async () => {
    const [rows] = await db.query("SELECT * FROM interns");
    if (!rows || rows.length === 0) {
      throw new Error("No interns found");
    }
    return rows;
  },
  getById: async (id) => {
    try {
      const [rows] = await db.query(
        `
        SELECT i.*, u.phone, u.email 
        FROM interns i 
        LEFT JOIN users u ON i.user_id = u.id 
        WHERE i.id = ?
      `,
        [id]
      );
      if (!rows || rows.length === 0) {
        throw new Error("Intern not found");
      }
      return rows;
    } catch (error) {
      console.error("Error fetching intern:", error);
      throw error;
    }
  },
  // Belirli bir kullanıcıya ait ilanları döner
  getByUserId: async (userId) => {
    const [rows] = await db.query("SELECT * FROM interns WHERE user_id = ?", [
      userId,
    ]);
    return rows;
  },

  // Yeni ilan oluşturur
  create: async (internData) => {
    const [result] = await db.query(
      `INSERT INTO interns 
       (title, province, district, category, description, duration, requirements, user_id) 
       VALUES (?, ?, ?, ?, ?, ?, ?,  ?)`,
      [
        internData.title,
        internData.province,
        internData.district,
        internData.category,

        internData.description,
        internData.duration,
        internData.requirements,
        internData.user_id,
      ]
    );
    return result.insertId;
  },

  // Var olan ilanı günceller
  update: async (id, internData) => {
    const result = await db.query(
      `UPDATE interns SET 
        title = ?, 
        province = ?, 
        district = ?, 
        category = ?, 
    
        description = ?, 
        duration = ?, 
        requirements = ? 
      WHERE id = ?`,
      [
        internData.title,
        internData.province,
        internData.district,
        internData.category,

        internData.description,
        internData.duration,
        internData.requirements,
        id,
      ]
    );
    return result[0].affectedRows;
  },

  // İlanı siler
  delete: async (id) => {
    const result = await db.query("DELETE FROM interns WHERE id = ?", [id]);
    return result[0].affectedRows;
  },
};

module.exports = InternAd;
