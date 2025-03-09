const db = require("../config/db");

const YurtAdPhoto = {
  // Yurt ilanına ait fotoğrafları ekle
  addPhotos: async (yurtAdId, photos) => {
    const photoValues = photos.map((photo) => [yurtAdId, photo]);
    await db.query(
      "INSERT INTO YurtAdPhotos (yurt_ad_id, photo_url) VALUES ?",
      [photoValues]
    );
  },

  // Yurt ilanına ait fotoğrafları al
  getPhotosByYurtAdId: async (yurtAdId) => {
    const [result] = await db.query(
      "SELECT id, yurt_ad_id, photo_url FROM YurtAdPhotos WHERE yurt_ad_id = ?",
      [yurtAdId]
    );
    return result; // Fotoğrafları döndür
  },

  // Tüm ilanların fotoğraflarını al
  getAllPhotos: async () => {
    const [result] = await db.query(
      "SELECT id, yurt_ad_id, photo_url FROM YurtAdPhotos"
    );
    return result;
  },
};

module.exports = YurtAdPhoto;
