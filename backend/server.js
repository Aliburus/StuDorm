const express = require("express");
const { connectDB, getUsers } = require("./config/db"); // Veritabanı bağlantısı ve getUsers fonksiyonunu al
require("dotenv").config(); // .env dosyasını yüklemek için

const app = express();

// Veritabanına bağlan
connectDB();

// /users endpoint'inden veri çekme
app.get("/users", async (req, res) => {
  const users = await getUsers(); // Kullanıcıları çek
  console.log(users);
  res.json(users); // Kullanıcıları JSON formatında döndür
});

// Sunucuyu başlat
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor`);
});
