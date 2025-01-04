const YurtAd = require("../models/YurtAd");
const YurtAdPhoto = require("../models/YurtAdPhoto");

const createYurtAd = async (req, res) => {
  const { title, description, price, location, gender_required } = req.body;
  const photos = req.files.map((file) => `/uploads/${file.filename}`);

  try {
    const yurtAdId = await YurtAd.create({
      title,
      description,
      price,
      location,
      gender_required,
    });

    if (photos.length > 0) {
      await YurtAdPhoto.addPhotos(yurtAdId, photos);
    }

    res.status(200).json({
      message: "İlan ve fotoğraflar başarıyla kaydedildi.",
      ilan_id: yurtAdId,
    });
  } catch (error) {
    console.error("Kayıt sırasında hata:", error);
    res.status(500).json({ message: "Kayıt işlemi başarısız.", error });
  }
};

module.exports = { createYurtAd };
