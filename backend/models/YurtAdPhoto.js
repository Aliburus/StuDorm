const db = require("../config/db");

const YurtAdPhoto = {
  // Yurt ilanına ait fotoğrafları ekle
  addPhotos: async (yurtAdId, photos) => {
    const photoValues = photos.map((photo) => [yurtAdId, photo]);
    try {
      await db.query(
        "INSERT INTO YurtAdPhotos (yurt_ad_id, photo_url) VALUES ?",
        [photoValues]
      );
    } catch (error) {
      console.error("Error while inserting photos:", error);
      throw new Error("Error while saving photos.");
    }
  },

  // Yurt ilanına ait fotoğrafları al
  getPhotosByYurtAdId: async (yurtAdId) => {
    try {
      const [result] = await db.query(
        "SELECT id, yurt_ad_id, photo_url FROM YurtAdPhotos WHERE yurt_ad_id = ?",
        [yurtAdId]
      );
      return result; // Return photos
    } catch (error) {
      console.error("Error while fetching photos:", error);
      throw new Error("Error while fetching photos.");
    }
  },

  // Tüm ilanların fotoğraflarını al
  getAllPhotos: async () => {
    try {
      const [result] = await db.query(
        "SELECT id, yurt_ad_id, photo_url FROM YurtAdPhotos"
      );
      return result; // Return all photos
    } catch (error) {
      console.error("Error while fetching all photos:", error);
      throw new Error("Error while fetching all photos.");
    }
  },

  // Yurt ilanına ait fotoğrafları sil
  deletePhotosByYurtAdId: async (yurtAdId) => {
    try {
      await db.query("DELETE FROM YurtAdPhotos WHERE yurt_ad_id = ?", [
        yurtAdId,
      ]);
    } catch (error) {
      console.error("Error while deleting photos:", error);
      throw new Error("Error while deleting photos.");
    }
  },
};

module.exports = YurtAdPhoto;
