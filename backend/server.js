const express = require("express");
const cors = require("cors");
const path = require("path");

const yurtAdRoutes = require("./routes/YurtAdRoutes");
const authRoutes = require("./routes/AuthRoutes");
const partTimeAdvertRoutes = require("./routes/PartTimeAdvertRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const forumRoutes = require("./routes/forumRoutes");
const internRoutes = require("./routes/InternRoutes");
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

app.use("/api/parttimeads", partTimeAdvertRoutes);
app.use("/api/user", userRoutes);

app.use("/admin", adminRoutes);

app.use("/api/forum", forumRoutes);

app.use("/api/interns", internRoutes);

// Sunucuyu başlatma
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor...`);
});
