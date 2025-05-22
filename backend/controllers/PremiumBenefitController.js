const PremiumBenefit = require("../models/premiumBenefit");
const User = require("../models/User");

const getAllBenefits = async (req, res) => {
  try {
    const benefits = await PremiumBenefit.getAll();
    if (!benefits || benefits.length === 0) {
      // Eğer veri yoksa varsayılan değerleri döndür
      return res.json([
        {
          title: "Premium Üyelik",
          description:
            "Premium üyelik ile ilanlarınız daha uzun süre aktif kalır ve daha fazla özellikten yararlanırsınız!",
          benefit_list:
            "Premium üyeler için ilan süresi 45 gün\nNormal üyeler için ilan süresi 7 gün\nÖne çıkan ilan gösterimi\nÖzel destek hizmeti",
          price: 1299.99,
          button_text: "Premium Ol",
        },
      ]);
    }
    res.json(benefits);
  } catch (error) {
    console.error("Premium benefit getirme hatası:", error);
    res.status(500).json({ message: error.message });
  }
};

const getBenefitById = async (req, res) => {
  try {
    const benefit = await PremiumBenefit.getById(req.params.id);
    if (!benefit) {
      return res.status(404).json({ message: "Premium benefit bulunamadı" });
    }
    res.json(benefit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createBenefit = async (req, res) => {
  try {
    const defaultBenefit = {
      title: "Premium Üyelik",
      description:
        "Premium üyelik ile ilanlarınız daha uzun süre aktif kalır ve daha fazla özellikten yararlanırsınız!",
      benefit_list:
        "Premium üyeler için ilan süresi 45 gün\nNormal üyeler için ilan süresi 7 gün\nÖne çıkan ilan gösterimi\nÖzel destek hizmeti",
      price: 1299.99,
      button_text: "Premium Ol",
    };

    const id = await PremiumBenefit.create(defaultBenefit);
    await User.logUserAction(req.user.id, "PREMIUM_BENEFIT_CREATE", {
      id,
      ...defaultBenefit,
    });
    res
      .status(201)
      .json({ id, message: "Premium benefit başarıyla oluşturuldu" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateBenefit = async (req, res) => {
  try {
    const before = await PremiumBenefit.getById(req.params.id);
    const success = await PremiumBenefit.update(req.params.id, req.body);
    if (!success) {
      return res.status(404).json({ message: "Premium benefit bulunamadı" });
    }
    await User.logUserAction(req.user.id, "PREMIUM_BENEFIT_UPDATE", {
      id: req.params.id,
      before,
      after: req.body,
    });
    res.json({ message: "Premium benefit başarıyla güncellendi" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteBenefit = async (req, res) => {
  try {
    const before = await PremiumBenefit.getById(req.params.id);
    const success = await PremiumBenefit.delete(req.params.id);
    if (!success) {
      return res.status(404).json({ message: "Premium benefit bulunamadı" });
    }
    await User.logUserAction(req.user.id, "PREMIUM_BENEFIT_DELETE", {
      id: req.params.id,
      before,
    });
    res.json({ message: "Premium benefit başarıyla silindi" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllBenefits,
  getBenefitById,
  createBenefit,
  updateBenefit,
  deleteBenefit,
};
