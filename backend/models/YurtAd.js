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
  }) => {
    const [result] = await db.query(
      `INSERT INTO YurtAds 
        (user_id, title, description, price, gender_required, status, is_hidden, province, district, room_type) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user_id,
        title,
        description,
        price,
        gender_required,
        status,
        is_hidden,
        province,
        district,
        room_type,
      ]
    );
    return result.insertId;
  },

  // Get all ads with optional filters
  getAll: async ({ minPrice, maxPrice, province, district, roomType }) => {
    let query =
      "SELECT id, user_id, title, description, price, gender_required, province, district, room_type, status, is_hidden, created_at, updated_at FROM YurtAds WHERE 1=1";
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
    const [rows] = await db.query("SELECT * FROM YurtAds WHERE user_id = ?", [
      userId,
    ]);
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
};

module.exports = YurtAd;
