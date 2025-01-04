const db = require("../config/db");

const YurtAd = {
  create: async ({ title, description, price, location, gender_required }) => {
    const [result] = await db.query(
      "INSERT INTO YurtAds (title, description, price, location, gender_required) VALUES (?, ?, ?, ?, ?)",
      [title, description, price, location, gender_required]
    );
    return result.insertId; // Yeni ilan ID'si
  },
};

module.exports = YurtAd;
