// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const yurtAdRoutes = require("./routes/YurtAdRoutes");
const authRoutes = require("./routes/AuthRoutes");
const partTimeAdvertRoutes = require("./routes/PartTimeAdvertRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes"); // Admin route'u import et
const postRoutes = require("./routes/PostRoutes");
const internRoutes = require("./routes/InternRoutes");
const paymentRoutes = require("./routes/PaymentRoutes");
const homepageRoutes = require("./routes/homepageRoutes");
const contactRoutes = require("./routes/contactRoutes");
const premiumBenefitRoutes = require("./routes/PremiumBenefitRoutes");

const app = express();

// Middleware'ler
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"], // Authorization header'ını da ekleyin
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Rotalar
app.use("/api/auth", authRoutes);
app.use("/api", yurtAdRoutes);
app.use("/api/parttimeads", partTimeAdvertRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/interns", internRoutes);
app.use("/api", paymentRoutes);
app.use("/api/homepage", homepageRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/contact-messages", contactRoutes);
app.use("/api/premium-benefits", premiumBenefitRoutes);

// Sunucuyu başlatma
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor...`);
});
