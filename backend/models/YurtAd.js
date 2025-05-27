const db = require("../config/db");

const YurtAd = {
  // Create a new ad
  create: async ({
    user_id,
    title,
    description,
    price,
    gender_required,
    province,
    district,
    room_type,
    status,
    is_hidden,
    expires_at,
  }) => {
    const [result] = await db.query(
      `INSERT INTO YurtAds 
        (user_id, title, description, price, gender_required, status, is_hidden, province, district, room_type, expires_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user_id,
        title,
        description,
        price,
        gender_required,
        "active",
        is_hidden,
        province,
        district,
        room_type,
        expires_at,
      ]
    );
    return result.insertId;
  },

  // Get all ads with optional filters
  getAll: async ({ minPrice, maxPrice, province, district, roomType }) => {
    let query =
      "SELECT id, user_id, title, description, price, gender_required, province, district, room_type, status, is_hidden, created_at, updated_at FROM YurtAds WHERE status = 'active'";
    const params = [];

    if (minPrice) {
      query += " AND price >= ?";
      params.push(minPrice);
    }
    if (maxPrice) {
      query += " AND price <= ?";
      params.push(maxPrice);
    }
    if (province) {
      query += " AND province = ?";
      params.push(province);
    }
    if (district) {
      query += " AND district = ?";
      params.push(district);
    }
    if (roomType) {
      query += " AND room_type = ?";
      params.push(roomType);
    }

    const [result] = await db.query(query, params);
    return result;
  },

  getByUserId: async (userId) => {
    const [rows] = await db.query(
      "SELECT * FROM YurtAds WHERE user_id = ? AND status = 'active'",
      [userId]
    );
    return rows;
  },

  getById: async (id) => {
    const [rows] = await db.query(
      "SELECT id, user_id, title, description, price, gender_required, province, district, room_type, status, is_hidden, created_at, updated_at FROM YurtAds WHERE id = ?",
      [id]
    );
    return rows;
  },

  update: async (id, data) => {
    const {
      title,
      description,
      price,
      gender_required,
      province,
      district,
      room_type,
    } = data;

    const [result] = await db.query(
      `UPDATE YurtAds SET 
        title = ?,
        description = ?,
        price = ?,
        gender_required = ?,
        province = ?,
        district = ?,
        room_type = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?`,
      [
        title,
        description,
        price,
        gender_required,
        province,
        district,
        room_type,
        id,
      ]
    );

    return result;
  },

  delete: async (id) => {
    const [result] = await db.query(
      "UPDATE YurtAds SET status = 'deleted' WHERE id = ?",
      [id]
    );
    return result;
  },

  // expires_at geçmiş ilanları inaktif yap
  setExpiredInactive: async () => {
    await db.query(
      "UPDATE YurtAds SET status = 'inactive' WHERE expires_at < NOW() AND status = 'active'"
    );
  },

  // Admin için tüm ilanlar (status filtresi yok)
  getAllAdmin: async () => {
    const [rows] = await db.query(
      "SELECT * FROM YurtAds ORDER BY created_at DESC"
    );
    return rows;
  },

  // Admin status güncelleme
  updateStatus: async (id, status) => {
    const [result] = await db.query(
      "UPDATE YurtAds SET status = ? WHERE id = ?",
      [status, id]
    );
    return result.affectedRows;
  },
};

module.exports = YurtAd;
