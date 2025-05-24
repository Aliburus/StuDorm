const contactModel = require("../models/ContactModel");
const ContactAnswer = require("../models/ContactAnswer");

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
    const result = await contactModel.create({ email, message });
    return res
      .status(201)
      .json({ message: "Mesaj başarıyla gönderildi.", result });
  } catch (err) {
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
    return res.status(500).json({ message: "Veritabanı hatası." });
  }
};

const replyToContactMessage = async (req, res) => {
  try {
    const { contact_message_id, email, message } = req.body;
    const answered_by = req.user.email;
    await ContactAnswer.create({
      contact_message_id,
      answer: message,
      answered_email: email,
      answered_by,
    });
    res.status(200).json({ message: "Cevap kaydedildi ve gönderildi." });
  } catch (err) {
    res.status(500).json({ error: "Cevap kaydedilemedi." });
  }
};

const getContactAnswerByMessageId = async (req, res) => {
  try {
    const { messageId } = req.params;
    const answers = await ContactAnswer.getByMessageId(messageId);
    res.json(answers);
  } catch (err) {
    res.status(500).json({ error: "Cevaplar alınamadı." });
  }
};

module.exports = {
  createContactMessage,
  getAllContactMessages,
  getUserMessages,
  replyToContactMessage,
  getContactAnswerByMessageId,
};
