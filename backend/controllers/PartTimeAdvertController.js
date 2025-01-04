const PartTimeAdvert = require("../models/PartTimeAdvert");

const createAdvert = (req, res) => {
  const { title, description, salary, location, requirements } = req.body;

  // Yeni ilan verisini modelle gönderiyoruz
  const newAdvert = {
    title,
    description,
    salary,
    location,
    requirements,
  };

  // PartTimeAdvert modelindeki create fonksiyonunu çağırıyoruz
  PartTimeAdvert.create(newAdvert, (err, result) => {
    if (err) {
      console.error("İlan oluşturulurken hata oluştu:", err);
      return res
        .status(500)
        .json({ message: "İlan oluşturulurken hata oluştu", error: err });
    }
    res.status(201).json({
      message: "İlan başarıyla oluşturuldu",
      advertId: result.insertId,
    });
  });
};

module.exports = {
  createAdvert,
};
