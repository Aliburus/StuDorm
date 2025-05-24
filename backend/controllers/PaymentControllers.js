// controllers/PaymentControllers.js
const mysql = require("mysql2/promise");
const Iyzipay = require("iyzipay");
require("dotenv").config();

const iyzipay = new Iyzipay({
  apiKey: process.env.IYZICO_API_KEY,
  secretKey: process.env.IYZICO_SECRET_KEY,
  uri: "https://sandbox-api.iyzipay.com",
});

const testCards = [
  {
    cardNumber: "5890040000000016",
    bank: "Akbank",
    type: "Master Card (Debit)",
  },
  {
    cardNumber: "5526080000000006",
    bank: "Akbank",
    type: "Master Card (Credit)",
  },
  {
    cardNumber: "4766620000000001",
    bank: "Denizbank",
    type: "Visa (Debit)",
  },
  {
    cardNumber: "4603450000000000",
    bank: "Denizbank",
    type: "Visa (Credit)",
  },
  {
    cardNumber: "4987490000000002",
    bank: "Finansbank",
    type: "Visa (Debit)",
  },
  {
    cardNumber: "5311570000000005",
    bank: "Finansbank",
    type: "Master Card (Credit)",
  },
  {
    cardNumber: "9792020000000001",
    bank: "Finansbank",
    type: "Troy (Debit)",
  },
  {
    cardNumber: "9792030000000000",
    bank: "Finansbank",
    type: "Troy (Credit)",
  },
  {
    cardNumber: "5170410000000004",
    bank: "Garanti Bankası",
    type: "Master Card (Debit)",
  },
  {
    cardNumber: "5400360000000003",
    bank: "Garanti Bankası",
    type: "Master Card (Credit)",
  },
  {
    cardNumber: "374427000000003",
    bank: "Garanti Bankası",
    type: "American Express",
  },
  {
    cardNumber: "4475050000000003",
    bank: "Halkbank",
    type: "Visa (Debit)",
  },
  {
    cardNumber: "5528790000000008",
    bank: "Halkbank",
    type: "Master Card (Credit)",
  },
  {
    cardNumber: "4059030000000009",
    bank: "HSBC Bank",
    type: "Visa (Debit)",
  },
  {
    cardNumber: "5504720000000003",
    bank: "HSBC Bank",
    type: "Master Card (Credit)",
  },
  {
    cardNumber: "5892830000000000",
    bank: "Türkiye İş Bankası",
    type: "Master Card (Debit)",
  },
  {
    cardNumber: "4543590000000006",
    bank: "Türkiye İş Bankası",
    type: "Visa (Credit)",
  },
  {
    cardNumber: "4910050000000006",
    bank: "Vakıfbank",
    type: "Visa (Debit)",
  },
  {
    cardNumber: "4157920000000002",
    bank: "Vakıfbank",
    type: "Visa (Credit)",
  },
  {
    cardNumber: "5168880000000002",
    bank: "Yapı ve Kredi Bankası",
    type: "Master Card (Debit)",
  },
  {
    cardNumber: "5451030000000000",
    bank: "Yapı ve Kredi Bankası",
    type: "Master Card (Credit)",
  },
];

const processPayment = async (req, res) => {
  console.log("1. Ödeme isteği başladı:", req.body);

  try {
    const { cardNumber, bank, cardType } = req.body;
    console.log("2. Gelen veriler:", { cardNumber, bank, cardType });

    if (!cardNumber || !bank || !cardType) {
      console.log("3. Eksik veri hatası");
      return res.status(400).json({
        success: false,
        message: "Tüm alanlar gereklidir!",
      });
    }

    // Test kartı kontrolü
    console.log("4. Test kartı kontrolü yapılıyor...");
    const matchedCard = testCards.find(
      (card) =>
        card.cardNumber === cardNumber &&
        card.bank === bank &&
        card.type === cardType
    );
    console.log("5. Eşleşen kart:", matchedCard);

    if (!matchedCard) {
      console.log("6. Kart eşleşmedi");
      return res.status(400).json({
        success: false,
        message: "Geçersiz kart bilgileri!",
      });
    }

    // Veritabanı bağlantısı
    console.log("7. Veritabanı bağlantısı kuruluyor...");
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    console.log("8. Veritabanı bağlantısı başarılı");

    try {
      // Premium fiyatını al
      console.log("9. Premium fiyatı sorgulanıyor...");
      const [benefits] = await connection.query(
        "SELECT price FROM premium_benefits ORDER BY id DESC LIMIT 1"
      );
      console.log("10. Premium fiyatı sonucu:", benefits);

      if (!benefits || benefits.length === 0) {
        console.log("11. Premium fiyatı bulunamadı");
        return res.status(500).json({
          success: false,
          message: "Premium fiyatı bulunamadı!",
        });
      }

      const amount = benefits[0].price;
      console.log("12. Premium fiyatı:", amount);

      // Başarılı ödeme simülasyonu
      console.log("13. Ödeme başarılı");
      return res.status(200).json({
        success: true,
        message: "Ödeme başarılı!",
        cardInfo: matchedCard,
        amount: amount,
      });
    } catch (dbError) {
      console.error("14. Veritabanı hatası:", dbError);
      throw dbError;
    } finally {
      console.log("15. Veritabanı bağlantısı kapatılıyor");
      await connection.end();
    }
  } catch (error) {
    console.error("16. Genel hata:", error);
    return res.status(500).json({
      success: false,
      message: "Ödeme işlemi sırasında bir hata oluştu!",
      error: error.message,
    });
  }
};

module.exports = {
  processPayment,
};
