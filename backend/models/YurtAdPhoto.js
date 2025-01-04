const db = require("../config/db");

const YurtAdPhoto = {
  addPhotos: async (yurtAdId, photos) => {
    const photoValues = photos.map((photo) => [yurtAdId, photo]);
    await db.query(
      "INSERT INTO YurtAdPhotos (yurt_ad_id, photo_url) VALUES ?",
      [photoValues]
    );
  },
};

module.exports = YurtAdPhoto;
