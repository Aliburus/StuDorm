const contactModel = require("../models/ContactModel");

const createContactMessage = async (req, res) => {
  // Payload sadece email & message gönderecek
  const { email, message } = req.body;

  // Zorunlu alanlar: email ve message
  if (!email) {
    return res.status(400).json({ message: "E-posta zorunlu." });
  }
  if (!message) {
    return res.status(400).json({ message: "Mesaj boş olamaz." });
  }

  try {
    console.log("Veriler alındı:", { email, message });
    const result = await contactModel.create({ email, message });
    console.log("Mesaj kaydedildi:", result);
    return res
      .status(201)
      .json({ message: "Mesaj başarıyla gönderildi.", result });
  } catch (err) {
    console.error("Veritabanı hatası:", err);
    return res.status(500).json({ message: "Veritabanı hatası." });
  }
};

const getAllContactMessages = async (req, res) => {
  try {
    const messages = await contactModel.getAllMessages();
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Mesajlar alınamadı." });
  }
};

const getUserMessages = async (req, res) => {
  try {
    const userEmail = req.user.email; // auth middleware has set req.user
    const messages = await contactModel.getByEmail(userEmail);
    return res.status(200).json(messages);
  } catch (err) {
    console.error("Kullanıcı mesajları alınamadı:", err);
    return res.status(500).json({ message: "Veritabanı hatası." });
  }
};

module.exports = {
  createContactMessage,
  getAllContactMessages,
  getUserMessages,
};
