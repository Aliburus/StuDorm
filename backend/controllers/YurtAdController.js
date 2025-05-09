const YurtAd = require("../models/YurtAd");
const YurtAdPhoto = require("../models/YurtAdPhoto");

const createYurtAd = async (req, res) => {
  // JWT'den gelen user_id
  const userId = req.user.id;

  const {
    title,
    description,
    price,
    gender_required,
    province,
    district,
    room_type,
  } = req.body;

  // Defaults
  const status = "active";
  const is_hidden = false;

  const photos = (req.files || []).map((file) => `/uploads/${file.filename}`);

  try {
    const yurtAdId = await YurtAd.create({
      user_id: userId,
      title,
      description,
      price,
      gender_required,
      province,
      district,
      room_type,
      status,
      is_hidden,
    });

    if (photos.length) {
      await YurtAdPhoto.addPhotos(yurtAdId, photos);
    }

    return res.status(200).json({
      message: "Ad and photos saved successfully.",
      ilan_id: yurtAdId,
    });
  } catch (err) {
    console.error("Controller hata:", err);
    return res
      .status(500)
      .json({ message: "İlan oluşturulamadı", error: err.message });
  }
};
// Get all ads with optional filters and photos
const getAllYurtAdsWithPhotos = async (req, res) => {
  const { minPrice, maxPrice, province, district, roomType } = req.query;
  try {
    const yurtAds = await YurtAd.getAll({
      minPrice,
      maxPrice,
      province,
      district,
      roomType,
    });

    const yurtAdsWithPhotos = await Promise.all(
      yurtAds.map(async (yurtAd) => {
        const photos = await YurtAdPhoto.getPhotosByYurtAdId(yurtAd.id);
        return {
          ...yurtAd,
          photos: photos.map((photo) => photo.photo_url),
        };
      })
    );

    res.status(200).json(yurtAdsWithPhotos);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Error fetching data.", error });
  }
};

const getYurtAdsByUserId = async (req, res) => {
  try {
    const ads = await YurtAd.getByUserId(req.params.userId);
    return res.status(200).json(ads);
  } catch (error) {
    console.error("Error fetching user yurt ads:", error);
    return res
      .status(500)
      .json({ message: "Error fetching user yurt ads", error });
  }
};

const getYurtAdById = async (req, res) => {
  try {
    const [ad] = await YurtAd.getById(req.params.id);
    if (!ad) return res.status(404).json({ message: "İlan bulunamadı" });

    const photos = await YurtAdPhoto.getPhotosByYurtAdId(ad.id);
    res.json({
      ...ad,
      images: photos.map((p) => p.photo_url),
      features: ad.features?.split(","),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "İlan getirilemedi", error: err });
  }
};

module.exports = {
  createYurtAd,
  getAllYurtAdsWithPhotos,
  getYurtAdsByUserId,
  getYurtAdById,
};
