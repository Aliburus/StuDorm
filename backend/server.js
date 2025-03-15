const express = require("express");
const cors = require("cors");
const path = require("path");

const yurtAdRoutes = require("./routes/YurtAdRoutes");
const authRoutes = require("./routes/AuthRoutes");
const partTimeAdvertRoutes = require("./routes/PartTimeAdvertRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const postRoutes = require("./routes/PostRoutes");
const internRoutes = require("./routes/InternRoutes");
const paymentRoutes = require("./routes/PaymentRoutes");
const app = express();

// Middleware'ler

app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your frontend URL
    methods: ["GET", "POST", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
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
app.use("/api/posts", postRoutes);
app.use("/api/interns", internRoutes);
app.use("/api", paymentRoutes);
// Sunucuyu başlatma
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor...`);
});
