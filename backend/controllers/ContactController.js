const contactModel = require("../models/ContactModel");

const createContactMessage = async (req, res) => {
  let { user_id, name, surname, email, message } = req.body;

  // Eğer kullanıcı giriş yapmışsa, onun bilgilerini alıyoruz
  if (req.user) {
    user_id = req.user.id; // Giriş yapmış kullanıcı ID'si
    name = req.user.name; // Giriş yapmış kullanıcı adı
    surname = req.user.surname; // Giriş yapmış kullanıcı soyadı
    email = req.user.email; // Giriş yapmış kullanıcı e-posta adresi
  }

  // Kullanıcı bilgileri eksikse hata dönüyoruz
  if (!user_id || !name || !surname || !email) {
    return res.status(400).json({ message: "Kullanıcı bilgileri eksik." });
  }

  if (!message) {
    return res.status(400).json({ message: "Mesaj boş olamaz." });
  }

  try {
    console.log("Veriler başarıyla alındı", {
      user_id,
      name,
      surname,
      email,
      message,
    });
    const result = await contactModel.create({
      user_id,
      name,
      surname,
      email,
      message,
    });
    console.log("Mesaj başarıyla kaydedildi", result);
    res.status(201).json({ message: "Mesaj başarıyla gönderildi.", result });
  } catch (err) {
    console.error("Mesaj gönderme hatası:", err);
    return res.status(500).json({ message: "Veritabanı hatası" });
  }
};

const getAllMessages = async (req, res) => {
  try {
    // Tüm mesajları al
    const messages = await contactModel.getAllMessages();
    res.status(200).json(messages);
  } catch (err) {
    console.error("Mesajları alma hatası:", err);
    return res.status(500).json({ message: "Veritabanı hatası" });
  }
};

module.exports = {
  createContactMessage,
  getAllMessages,
};
