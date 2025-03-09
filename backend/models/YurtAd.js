const db = require("../config/db");

const YurtAd = {
  // Yeni ilan oluşturma
  create: async ({
    user_id, // Yeni alan: user_id
    title,
    description,
    price,
    location,
    gender_required,
    province,
    district,
    room_type,
    status, // Yeni alan: status
    is_hidden, // Yeni alan: is_hidden
    is_premium, // Yeni alan: is_premium
  }) => {
    const [result] = await db.query(
      "INSERT INTO YurtAds (user_id, title, description, price, location, gender_required, province, district, room_type, status, is_hidden, is_premium) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        user_id,
        title,
        description,
        price,
        location,
        gender_required,
        province,
        district,
        room_type,
        status,
        is_hidden,
        is_premium,
      ]
    );
    return result.insertId; // Yeni ilan ID'si
  },

  // Tüm ilanları al
  getAll: async ({ minPrice, maxPrice, province, district, roomType }) => {
    let query =
      "SELECT id, user_id, title, description, price, location, gender_required, province, district, room_type, status, is_hidden, is_premium, created_at, updated_at FROM YurtAds WHERE 1=1";
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
};

module.exports = YurtAd;
