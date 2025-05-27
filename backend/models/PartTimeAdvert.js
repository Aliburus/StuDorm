const db = require("../config/db");

const PartTimeAdvert = {
  create: async (advert) => {
    try {
      const {
        title,
        category,
        province,
        district,

        description,
        duration,
        requirements,
        price, // Add price here
        user_id,
        expires_at,
      } = advert;

      const query = `
        INSERT INTO parttimeads 
        (title, category, province, district,  description, duration, requirements, price, created_at, user_id, expires_at, status) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?, ?, ?)
      `;

      const [result] = await db.query(query, [
        title,
        category,
        province,
        district,

        description,
        duration,
        requirements,
        price, // Pass price value here
        user_id,
        expires_at,
        "active",
      ]);

      return result.insertId;
    } catch (err) {
      throw err;
    }
  },

  getAll: async () => {
    try {
      const query = `
        SELECT id, title, category, province, district,  description, duration, requirements, price, created_at, user_id 
        FROM parttimeads 
        WHERE status = 'active'
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
      const query = `
        SELECT p.*, u.phone, u.email 
        FROM parttimeads p 
        LEFT JOIN users u ON p.user_id = u.id 
        WHERE p.id = ?
      `;
      const [rows] = await db.query(query, [id]);
      return rows;
    } catch (err) {
      throw err;
    }
  },

  deleteById: async (id) => {
    try {
      const query = "UPDATE parttimeads SET status = 'deleted' WHERE id = ?";
      const [result] = await db.query(query, [id]);
      return result.affectedRows;
    } catch (err) {
      throw err;
    }
  },
  getByUserId: async (userId) => {
    const [rows] = await db.query(
      "SELECT * FROM parttimeads WHERE user_id = ? AND status = 'active'",
      [userId]
    );
    return rows;
  },
  updateById: async (id, advert) => {
    try {
      const query = `
        UPDATE parttimeads SET
          title = ?,
          category = ?,
          province = ?,
          district = ?,
          description = ?,
          duration = ?,
          requirements = ?,
          price = ?
        WHERE id = ?
      `;
      const [result] = await db.query(query, [
        advert.title,
        advert.category,
        advert.province,
        advert.district,
        advert.description,
        advert.duration,
        advert.requirements,
        advert.price,
        id,
      ]);
      return result.affectedRows;
    } catch (err) {
      throw err;
    }
  },
  // expires_at geçmiş ilanları inaktif yap
  setExpiredInactive: async () => {
    await db.query(
      "UPDATE parttimeads SET status = 'inactive' WHERE expires_at < NOW() AND status = 'active'"
    );
  },
  // Admin için tüm ilanlar (status filtresi yok)
  getAllAdmin: async () => {
    const [rows] = await db.query(
      "SELECT * FROM parttimeads ORDER BY created_at DESC"
    );
    return rows;
  },

  // Admin status güncelleme
  updateStatus: async (id, status) => {
    const [result] = await db.query(
      "UPDATE parttimeads SET status = ? WHERE id = ?",
      [status, id]
    );
    return result.affectedRows;
  },
};

module.exports = PartTimeAdvert;
