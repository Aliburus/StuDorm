const db = require("../config/db");

const YurtAd = {
  // Yeni ilan oluşturma
  create: async ({ title, description, price, location, gender_required }) => {
    const [result] = await db.query(
      "INSERT INTO YurtAds (title, description, price, location, gender_required) VALUES (?, ?, ?, ?, ?)",
      [title, description, price, location, gender_required]
    );
    return result.insertId; // Yeni ilan ID'si
  },

  // Tüm ilanları al
  getAll: async () => {
    const [result] = await db.query(
      "SELECT id, title, description, price, location, gender_required, status, is_hidden, is_premium, created_at, updated_at FROM YurtAds"
    );
    return result;
  },
};

module.exports = YurtAd;
