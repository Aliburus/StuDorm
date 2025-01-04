const express = require("express");
const cors = require("cors");
const path = require("path");

const yurtAdRoutes = require("./routes/YurtAdRoutes");
const authRoutes = require("./routes/AuthRoutes");
const parttimeAdvertRoutes = require("./routes/PartTimeAdvertRoutes");

const app = express();

// Middleware'ler
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Statik dosyalar için klasör
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Rotalar
app.use("/api/auth", authRoutes); // Yetkilendirme rotaları
app.use("/api", yurtAdRoutes); // Yurt ilanı rotaları

app.use("/api/parttimeadverts", parttimeAdvertRoutes);

// Sunucuyu başlatma
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor...`);
});
