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
       (title, province, district, category, description, duration, requirements, user_id, expires_at, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        internData.title,
        internData.province,
        internData.district,
        internData.category,
        internData.description,
        internData.duration,
        internData.requirements,
        internData.user_id,
        internData.expires_at,
        "active",
      ]
    );
    return result.insertId;
  },

  // Var olan ilanı günceller
  update: async (id, internData) => {
    try {
      const result = await db.query(
        `UPDATE interns SET 
          title = ?, 
          province = ?, 
          district = ?, 
          category = ?, 
          description = ?, 
          duration = ?, 
          requirements = ?,
          updated_at = CURRENT_TIMESTAMP
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
    } catch (error) {
      console.error("Staj ilanı güncellenirken hata:", error);
      throw error;
    }
  },

  // İlanı siler
  delete: async (id) => {
    const result = await db.query(
      "UPDATE interns SET status = 'deleted' WHERE id = ?",
      [id]
    );
    return result[0].affectedRows;
  },

  // expires_at geçmiş ilanları inaktif yap
  setExpiredInactive: async () => {
    await db.query(
      "UPDATE interns SET status = 'inactive' WHERE expires_at < NOW() AND status = 'active'"
    );
  },

  // Admin için tüm ilanlar (status filtresi yok)
  getAllAdmin: async () => {
    const [rows] = await db.query(
      "SELECT * FROM interns ORDER BY created_at DESC"
    );
    return rows;
  },

  // Admin status güncelleme
  updateStatus: async (id, status) => {
    const [result] = await db.query(
      "UPDATE interns SET status = ? WHERE id = ?",
      [status, id]
    );
    return result.affectedRows;
  },
};

module.exports = InternAd;
