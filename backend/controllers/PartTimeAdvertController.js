const db = require("../config/db");
const PartTimeAdvert = require("../models/PartTimeAdvert");
const User = require("../models/User");

const createAdvert = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      title,
      category,
      province,
      district,
      description,
      duration,
      requirements,
      price,
    } = req.body;

    if (
      !title ||
      !category ||
      !province ||
      !district ||
      !description ||
      !duration ||
      !requirements ||
      !price
    ) {
      return res.status(400).json({ message: "Tüm alanlar zorunludur!" });
    }

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

    // expires_at hesapla
    const expiresAt = new Date(
      now.getTime() + (isPremium ? 45 : 7) * 24 * 60 * 60 * 1000
    );
    const expiresAtStr = expiresAt.toISOString().slice(0, 19).replace("T", " ");

    const advertId = await PartTimeAdvert.create({
      title,
      category,
      province,
      district,
      description,
      duration,
      requirements,
      price,
      user_id: userId,
      expires_at: expiresAtStr,
    });

    await User.logUserAction(userId, "PARTTIME_AD_CREATE", {
      ilan_id: advertId,
      title,
      category,
      province,
      district,
      price,
    });

    res.status(201).json({ message: "İlan başarıyla oluşturuldu", advertId });
  } catch (error) {
    console.error("İlan oluşturulurken hata oluştu:", error);
    res.status(500).json({ message: "İlan oluşturulurken hata oluştu", error });
  }
};

const getAllAdverts = async (req, res) => {
  try {
    const adverts = await PartTimeAdvert.getAll();
    res.status(200).json(adverts);
  } catch (error) {
    console.error("İlanları getirirken hata oluştu:", error);
    res.status(500).json({ message: "İlanları getirirken hata oluştu", error });
  }
};

const getAdvertById = async (req, res) => {
  try {
    const { id } = req.params;
    const advertArr = await PartTimeAdvert.getById(id);
    if (advertArr.length === 0) {
      return res.status(404).json({ message: "İlan bulunamadı" });
    }
    const advert = advertArr[0];
    // owner bilgisi ekle
    const [user] = await db.query(
      "SELECT name, surname, email, phone FROM users WHERE id = ?",
      [advert.user_id]
    );
    res.status(200).json({
      ...advert,
      owner: user[0],
    });
  } catch (error) {
    console.error("İlan getirilirken hata oluştu:", error);
    res.status(500).json({ message: "İlan getirilirken hata oluştu", error });
  }
};

const deleteAdvertById = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    // İlanın var olduğunu ve kullanıcıya ait olduğunu kontrol et
    const [advert] = await PartTimeAdvert.getById(id);
    if (!advert) {
      return res.status(404).json({ message: "İlan bulunamadı" });
    }
    if (advert.user_id !== userId) {
      return res.status(403).json({ message: "Bu ilanı silme yetkiniz yok" });
    }

    const affectedRows = await PartTimeAdvert.deleteById(id);

    // Log ekle
    await User.logUserAction(userId, "PARTTIME_AD_DELETE", {
      ilan_id: id,
      title: advert.title,
      province: advert.province,
      district: advert.district,
    });

    res.status(200).json({ message: "İlan başarıyla silindi" });
  } catch (error) {
    console.error("İlan silinirken hata oluştu:", error);
    res
      .status(500)
      .json({ message: "İlan silinirken hata oluştu", error: error.message });
  }
};

const getAdvertsByUserId = async (req, res) => {
  try {
    const adverts = await PartTimeAdvert.getByUserId(req.params.userId);
    return res.status(200).json(adverts);
  } catch (error) {
    console.error("Error fetching user part-time ads:", error);
    return res
      .status(500)
      .json({ message: "Error fetching user part-time ads", error });
  }
};

const updateAdvertById = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      category,
      province,
      district,
      description,
      duration,
      requirements,
      price,
    } = req.body;

    if (
      !title ||
      !category ||
      !province ||
      !district ||
      !description ||
      !duration ||
      !requirements ||
      !price
    ) {
      return res.status(400).json({ message: "Tüm alanlar zorunludur!" });
    }

    const affectedRows = await PartTimeAdvert.updateById(id, {
      title,
      category,
      province,
      district,
      description,
      duration,
      requirements,
      price,
    });

    if (affectedRows === 0) {
      return res.status(404).json({ message: "İlan bulunamadı" });
    }

    // Log ekle
    await User.logUserAction(req.user.id, "PARTTIME_AD_UPDATE", {
      ilan_id: id,
      title,
      category,
      province,
      district,
      price,
    });

    res.status(200).json({ message: "İlan başarıyla güncellendi" });
  } catch (error) {
    console.error("İlan güncellenirken hata oluştu:", error);
    res.status(500).json({ message: "İlan güncellenirken hata oluştu", error });
  }
};

module.exports = {
  getAdvertsByUserId,
  createAdvert,
  getAllAdverts,
  getAdvertById,
  deleteAdvertById,
  updateAdvertById,
};
