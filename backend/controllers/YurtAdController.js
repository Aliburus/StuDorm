const YurtAd = require("../models/YurtAd");
const YurtAdPhoto = require("../models/YurtAdPhoto");
const db = require("../config/db");
const User = require("../models/User");

const createYurtAd = async (req, res) => {
  const userId = req.user.id;
  const uploadedFiles = req.files || [];

  // Yeni fotoğraf kontrolü
  if (uploadedFiles.length < 5) {
    return res
      .status(400)
      .json({ message: "En az 5 fotoğraf yüklemelisiniz." });
  }
  if (uploadedFiles.length > 15) {
    return res
      .status(400)
      .json({ message: "En fazla 15 fotoğraf yükleyebilirsiniz." });
  }

  const {
    title,
    description,
    price,
    gender_required,
    province,
    district,
    room_type,
  } = req.body;
  const status = "active";
  const is_hidden = false;
  const photos = (req.files || []).map((file) => `/uploads/${file.filename}`);

  try {
    // Kullanıcıyı çek
    const [userRows] = await db.query(
      "SELECT premium_start, premium_end FROM users WHERE id = ?",
      [userId]
    );
    const user = userRows[0];
    const now = new Date();
    let isPremium = false;
    if (user.premium_start && user.premium_end) {
      const start = new Date(user.premium_start);
      const end = new Date(user.premium_end);
      isPremium = now >= start && now <= end;
    }

    // Tüm ilan türlerinin toplamını kontrol et (soft deleted dahil)
    const [parttimeCount] = await db.query(
      "SELECT COUNT(*) as count FROM parttimeads WHERE user_id = ? AND created_at > DATE_SUB(NOW(), INTERVAL 6 MONTH) AND status IN ('active', 'inactive', 'deleted')",
      [userId]
    );
    const [yurtCount] = await db.query(
      "SELECT COUNT(*) as count FROM yurtads WHERE user_id = ? AND created_at > DATE_SUB(NOW(), INTERVAL 6 MONTH) AND status IN ('active', 'inactive', 'deleted')",
      [userId]
    );
    const [internCount] = await db.query(
      "SELECT COUNT(*) as count FROM interns WHERE user_id = ? AND created_at > DATE_SUB(NOW(), INTERVAL 6 MONTH) AND status IN ('active', 'inactive', 'deleted')",
      [userId]
    );
    const totalAdCount =
      parttimeCount[0].count + yurtCount[0].count + internCount[0].count;
    if (!isPremium && totalAdCount >= 1) {
      return res.status(400).json({
        message:
          "Normal üyeler 6 ayda sadece 1 ilan ekleyebilir (parttime/yurt/staj toplamı).",
      });
    }

    const expiresAt = new Date(
      now.getTime() + (isPremium ? 45 : 7) * 24 * 60 * 60 * 1000
    );
    const expiresAtStr = expiresAt.toISOString().slice(0, 19).replace("T", " ");
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
      expires_at: expiresAtStr,
    });
    if (photos.length) {
      await YurtAdPhoto.addPhotos(yurtAdId, photos);
    }
    await User.logUserAction(userId, "YURT_AD_CREATE", {
      ilan_id: yurtAdId,
      title,
      price,
      province,
      district,
    });
    return res.status(200).json({
      message: "İlan ve fotoğraflar başarıyla kaydedildi.",
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
    // Her ilan için photoları ekle
    const adsWithPhotos = await Promise.all(
      ads.map(async (ad) => {
        const photos = await YurtAdPhoto.getPhotosByYurtAdId(ad.id);
        return {
          ...ad,
          images: photos.map((p) => p.photo_url),
        };
      })
    );
    return res.status(200).json(adsWithPhotos);
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
    const [user] = await db.query(
      "SELECT name, surname, email, phone FROM users WHERE id = ?",
      [ad.user_id]
    );

    res.json({
      ...ad,
      images: photos.map((p) => p.photo_url),
      features: ad.features?.split(","),
      owner: user[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "İlan getirilemedi", error: err });
  }
};

const updateYurtAd = async (req, res) => {
  const userId = req.user.id;
  const yurtAdId = req.params.id;
  const uploadedFiles = req.files || [];

  try {
    // İlanın var olduğunu ve kullanıcıya ait olduğunu kontrol et
    const [existingAd] = await YurtAd.getById(yurtAdId);
    if (!existingAd) {
      return res.status(404).json({ message: "İlan bulunamadı" });
    }
    if (existingAd.user_id !== userId) {
      return res
        .status(403)
        .json({ message: "Bu ilanı güncelleme yetkiniz yok" });
    }

    // Premium kontrolü
    const [userRows] = await db.query(
      "SELECT premium_start, premium_end FROM users WHERE id = ?",
      [userId]
    );
    const user = userRows[0];
    const now = new Date();
    let isPremium = false;
    if (user.premium_start && user.premium_end) {
      const start = new Date(user.premium_start);
      const end = new Date(user.premium_end);
      isPremium = now >= start && now <= end;
    }

    // Yeni expires_at hesapla
    const expiresAt = new Date(
      now.getTime() + (isPremium ? 45 : 7) * 24 * 60 * 60 * 1000
    );
    const expiresAtStr = expiresAt.toISOString().slice(0, 19).replace("T", " ");

    const {
      title,
      description,
      price,
      gender_required,
      province,
      district,
      room_type,
    } = req.body;

    // Zorunlu alanları kontrol et
    if (
      !title ||
      !description ||
      !price ||
      !gender_required ||
      !province ||
      !district ||
      !room_type
    ) {
      return res.status(400).json({ message: "Tüm alanları doldurmalısınız" });
    }

    // Mevcut fotoğrafları al
    const existingPhotos = await YurtAdPhoto.getPhotosByYurtAdId(yurtAdId);
    const totalPhotos = existingPhotos.length + uploadedFiles.length;

    // Toplam fotoğraf kontrolü
    if (totalPhotos < 5) {
      return res.status(400).json({ message: "En az 5 fotoğraf olmalıdır" });
    }
    if (totalPhotos > 15) {
      return res.status(400).json({ message: "En fazla 15 fotoğraf olabilir" });
    }

    // Yeni fotoğraf kontrolü
    if (uploadedFiles.length > 15) {
      return res.status(400).json({
        message: "Bir seferde en fazla 15 fotoğraf yükleyebilirsiniz",
      });
    }

    // İlanı güncelle
    await YurtAd.update(yurtAdId, {
      title,
      description,
      price,
      gender_required,
      province,
      district,
      room_type,
      expires_at: expiresAtStr,
    });

    // Yeni fotoğraflar varsa ekle
    if (uploadedFiles.length > 0) {
      const photos = uploadedFiles.map((file) => `/uploads/${file.filename}`);
      await YurtAdPhoto.addPhotos(yurtAdId, photos);
    }

    // Log ekle
    await User.logUserAction(userId, "YURT_AD_UPDATE", {
      ilan_id: yurtAdId,
      title,
      price,
      province,
      district,
    });

    return res.status(200).json({
      message: "İlan başarıyla güncellendi",
      ilan_id: yurtAdId,
    });
  } catch (err) {
    console.error("Controller hata:", err);
    return res
      .status(500)
      .json({ message: "İlan güncellenemedi", error: err.message });
  }
};

const deleteYurtAd = async (req, res) => {
  const userId = req.user.id;
  const yurtAdId = req.params.id;
  try {
    const [ad] = await YurtAd.getById(yurtAdId);
    if (!ad) {
      return res.status(404).json({ message: "İlan bulunamadı" });
    }
    if (ad.user_id !== userId) {
      return res.status(403).json({ message: "Bu ilanı silme yetkiniz yok" });
    }
    // Önce fotoğrafları sil
    await YurtAdPhoto.deletePhotosByYurtAdId(yurtAdId);
    // Sonra ilanı sil
    await YurtAd.delete(yurtAdId);
    await User.logUserAction(userId, "YURT_AD_DELETE", {
      ilan_id: yurtAdId,
      title: ad.title,
      price: ad.price,
      province: ad.province,
      district: ad.district,
    });
    return res.status(200).json({ message: "İlan başarıyla silindi" });
  } catch (err) {
    console.error("Yurt ilan silme hata:", err);
    return res
      .status(500)
      .json({ message: "İlan silinemedi", error: err.message });
  }
};

module.exports = {
  createYurtAd,
  getAllYurtAdsWithPhotos,
  getYurtAdsByUserId,
  getYurtAdById,
  updateYurtAd,
  deleteYurtAd,
};
