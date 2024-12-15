const sql = require("mssql");
require("dotenv").config(); // .env dosyasını yüklemek için

// Veritabanı bağlantı ayarları
const config = {
  server: process.env.DB_SERVER, // .env'den alınan sunucu adı
  database: process.env.DB_NAME, // .env'den alınan veritabanı adı
  options: {
    encrypt: true, // Azure bağlantıları için genellikle gereklidir
    trustServerCertificate: true, // Sertifika doğrulamasını atlamak için (yerel bağlantılar için)
    port: parseInt(process.env.DB_PORT) || 1433, // Portu sayıya dönüştür
  },
  authentication: {
    type: "ntlm", // Windows Authentication
    options: {
      domain: process.env.DB_SERVER, // Sunucu adı
      userName: process.env.DB_USER, // Kullanıcı adı
      password: process.env.DB_PASSWORD, // Şifre
    },
  },
};

// Veritabanına bağlanma fonksiyonu
const connectDB = async () => {
  try {
    await sql.connect(config); // MSSQL veritabanına bağlan
    console.log("MSSQL Veritabanına başarıyla bağlanıldı!");
  } catch (err) {
    console.error("Veritabanı bağlantı hatası:", err);
  }
};

// Kullanıcıları getirme fonksiyonu
const getUsers = async () => {
  try {
    const result = await sql.query("SELECT * FROM Users"); // Users tablosundaki tüm veriler
    return result.recordset; // Çekilen verileri döndür
  } catch (err) {
    console.error("Veri çekme hatası:", err);
    return [];
  }
};

// Veritabanı bağlantısı ve getUsers fonksiyonunu dışa aktar
module.exports = { connectDB, getUsers };
