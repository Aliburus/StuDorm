const YurtAd = require("../models/YurtAd");
const YurtAdPhoto = require("../models/YurtAdPhoto");

const createYurtAd = async (req, res) => {
  const {
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
  } = req.body;

  const photos = req.files.map((file) => `/uploads/${file.filename}`);

  try {
    // Yeni ilan oluşturma
    const yurtAdId = await YurtAd.create({
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
    });

    // Fotoğrafları ekleme
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

// Tüm ilanlar ve fotoğraflar ile birlikte almak için controller fonksiyonu
const getAllYurtAdsWithPhotos = async (req, res) => {
  const { minPrice, maxPrice, province, district, roomType } = req.query;
  try {
    // Tüm ilanları al
    const yurtAds = await YurtAd.getAll({
      minPrice,
      maxPrice,
      province,
      district,
      roomType,
    });

    // Her bir ilan için fotoğrafları al
    const yurtAdsWithPhotos = await Promise.all(
      yurtAds.map(async (yurtAd) => {
        const photos = await YurtAdPhoto.getPhotosByYurtAdId(yurtAd.id);
        return {
          ...yurtAd,
          photos: photos.map((photo) => photo.photo_url),
        }; // İlan bilgileri ve fotoğraflarını birleştir
      })
    );

    // İlanlar ve fotoğraflar
    res.status(200).json(yurtAdsWithPhotos);
  } catch (error) {
    console.error("Veri çekme hatası:", error);
    res
      .status(500)
      .json({ message: "Veri çekme sırasında bir hata oluştu.", error });
  }
};

module.exports = { createYurtAd, getAllYurtAdsWithPhotos };
