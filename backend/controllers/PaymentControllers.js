// controllers/PaymentControllers.js
const testCards = require("../models/CardModel");

const processPayment = (req, res) => {
  const { cardNumber, amount } = req.body; // Get card number and amount from request body

  // Kartı test kartlarıyla karşılaştırma
  const matchedCard = testCards.find((card) => card.cardNumber === cardNumber);

  if (!matchedCard) {
    return res.status(404).json({
      success: false,
      message: "Geçersiz kart numarası veya kart bulunamadı!",
    });
  }

  // Geçerli kart ise, ödeme işlemine devam et
  return res.status(200).json({
    success: true,
    message: "Ödeme başarıyla simüle edildi!",
    cardInfo: matchedCard,
    amount: amount,
  });
};

module.exports = {
  processPayment,
};
