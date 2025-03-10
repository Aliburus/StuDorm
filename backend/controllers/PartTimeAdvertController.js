const PartTimeAdvert = require("../models/PartTimeAdvert");

const createAdvert = async (req, res) => {
  try {
    const {
      title,
      category,
      province,
      district,
      contact,
      description,
      duration,
      requirements,
      user_id,
    } = req.body;

    if (
      !title ||
      !category ||
      !province ||
      !district ||
      !contact ||
      !description ||
      !duration ||
      !requirements ||
      !user_id
    ) {
      return res.status(400).json({ message: "Tüm alanlar zorunludur!" });
    }

    const advertId = await PartTimeAdvert.create({
      title,
      category,
      province,
      district,
      contact,
      description,
      duration,
      requirements,
      user_id,
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
    const advert = await PartTimeAdvert.getById(id);

    if (advert.length === 0) {
      return res.status(404).json({ message: "İlan bulunamadı" });
    }

    res.status(200).json(advert[0]);
  } catch (error) {
    console.error("İlan getirilirken hata oluştu:", error);
    res.status(500).json({ message: "İlan getirilirken hata oluştu", error });
  }
};

const deleteAdvertById = async (req, res) => {
  try {
    const { id } = req.params;
    const affectedRows = await PartTimeAdvert.deleteById(id);

    if (affectedRows === 0) {
      return res.status(404).json({ message: "İlan bulunamadı" });
    }

    res.status(200).json({ message: "İlan başarıyla silindi" });
  } catch (error) {
    console.error("İlan silinirken hata oluştu:", error);
    res.status(500).json({ message: "İlan silinirken hata oluştu", error });
  }
};

module.exports = {
  createAdvert,
  getAllAdverts,
  getAdvertById,
  deleteAdvertById,
};
