const YurtAd = require("../models/YurtAd");
const YurtAdPhoto = require("../models/YurtAdPhoto");

const createYurtAd = async (req, res) => {
  const {
    user_id, // User who is posting the ad
    title,
    description,
    price,
    location,
    gender_required,
    province,
    district,
    room_type,
    status, // New field: status (active/inactive)
    is_hidden, // New field: visibility status
    is_premium, // New field: premium status
  } = req.body;

  const photos = req.files.map((file) => `/uploads/${file.filename}`);

  try {
    // Create new ad
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

    // Add photos if provided
    if (photos.length > 0) {
      await YurtAdPhoto.addPhotos(yurtAdId, photos);
    }

    res.status(200).json({
      message: "Ad and photos saved successfully.",
      ilan_id: yurtAdId,
    });
  } catch (error) {
    console.error("Error during save:", error);
    res.status(500).json({ message: "Failed to save ad.", error });
  }
};

// Get all ads with optional filters and photos
const getAllYurtAdsWithPhotos = async (req, res) => {
  const { minPrice, maxPrice, province, district, roomType } = req.query;
  try {
    // Get all ads with filters
    const yurtAds = await YurtAd.getAll({
      minPrice,
      maxPrice,
      province,
      district,
      roomType,
    });

    // Get photos for each ad
    const yurtAdsWithPhotos = await Promise.all(
      yurtAds.map(async (yurtAd) => {
        const photos = await YurtAdPhoto.getPhotosByYurtAdId(yurtAd.id);
        return {
          ...yurtAd,
          photos: photos.map((photo) => photo.photo_url),
        };
      })
    );

    // Return ads with photos
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
module.exports = { createYurtAd, getAllYurtAdsWithPhotos, getYurtAdsByUserId };
