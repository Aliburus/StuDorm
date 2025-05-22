// controllers/InternController.js
const db = require("../config/db");
const InternAd = require("../models/InternAd");
const User = require("../models/User");

const InternController = {
  getAllInterns: async (req, res) => {
    try {
      const interns = await InternAd.getAll();
      res.status(200).json(interns);
    } catch (err) {
      res.status(500).json({ message: "Error fetching interns", error: err });
    }
  },

  getInternById: async (req, res) => {
    try {
      const intern = await InternAd.getById(req.params.id);
      if (intern.length === 0) {
        return res.status(404).json({ message: "Intern not found" });
      }
      const [user] = await db.query(
        "SELECT name, surname, email, phone FROM users WHERE id = ?",
        [intern[0].user_id]
      );
      res.status(200).json({
        ...intern[0],
        owner: user[0],
      });
    } catch (err) {
      res.status(500).json({ message: "Error fetching intern", error: err });
    }
  },

  createIntern: async (req, res) => {
    try {
      const userId = req.user.id;
      const {
        title,
        province,
        district,
        category,
        description,
        duration,
        requirements,
      } = req.body;
      // Kullanıcıyı çek
      const [userRows] = await db.query(
        "SELECT premium_start, premium_end FROM users WHERE id = ?",
        [userId]
      );
      const user = userRows[0];
      const now = new Date();
      let isPremium = false;
      if (user.premium_start && user.premium_end) {
        const start = new Date(user.premium_start);
        const end = new Date(user.premium_end);
        isPremium = now >= start && now <= end;
      }
      // Son 6 ayda eklenen ilan sayısı
      const [countRows] = await db.query(
        "SELECT COUNT(*) as count FROM interns WHERE user_id = ? AND created_at > DATE_SUB(NOW(), INTERVAL 6 MONTH)",
        [userId]
      );
      const adCount = countRows[0].count;
      if ((isPremium && adCount >= 6) || (!isPremium && adCount >= 1)) {
        return res.status(400).json({
          message: isPremium
            ? "6 ayda en fazla 6 ilan ekleyebilirsiniz (Premium)!"
            : "6 ayda en fazla 1 ilan ekleyebilirsiniz (Normal)!",
        });
      }
      // expires_at hesapla
      const expiresAt = new Date(
        now.getTime() + (isPremium ? 45 : 7) * 24 * 60 * 60 * 1000
      );
      const expiresAtStr = expiresAt
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
      const internData = {
        user_id: userId,
        title,
        province,
        district,
        category,
        description,
        duration,
        requirements,
        expires_at: expiresAtStr,
      };
      const internId = await InternAd.create(internData);
      await User.logUserAction(userId, "INTERN_AD_CREATE", {
        ilan_id: internId,
        title,
        province,
        district,
        category,
      });
      res.status(201).json({
        message: "Intern ad created successfully",
        intern_id: internId,
      });
    } catch (err) {
      console.error("Intern create error:", err);
      res.status(500).json({
        message: "Error creating intern ad",
        error: err.message,
      });
    }
  },

  updateIntern: async (req, res) => {
    try {
      const internData = req.body;
      const internId = req.params.id;
      await InternAd.update(internId, internData);
      await User.logUserAction(req.user.id, "INTERN_AD_UPDATE", {
        ilan_id: internId,
        ...internData,
      });
      res.status(200).json({ message: "Intern updated successfully" });
    } catch (err) {
      res.status(500).json({ message: "Error updating intern", error: err });
    }
  },

  deleteIntern: async (req, res) => {
    try {
      const userId = req.user.id;
      const internId = req.params.id;

      // İlanın var olduğunu ve kullanıcıya ait olduğunu kontrol et
      const [intern] = await InternAd.getById(internId);
      if (!intern) {
        return res.status(404).json({ message: "İlan bulunamadı" });
      }
      if (intern.user_id !== userId) {
        return res.status(403).json({ message: "Bu ilanı silme yetkiniz yok" });
      }

      await InternAd.delete(internId);
      await User.logUserAction(userId, "INTERN_AD_DELETE", {
        ilan_id: internId,
        title: intern.title,
        province: intern.province,
        district: intern.district,
      });
      res.status(200).json({ message: "İlan başarıyla silindi" });
    } catch (err) {
      console.error("Staj ilanı silme hatası:", err);
      res.status(500).json({
        message: "İlan silinirken bir hata oluştu",
        error: err.message,
      });
    }
  },

  getInternsByUserId: async (req, res) => {
    try {
      const interns = await InternAd.getByUserId(req.params.userId);
      return res.status(200).json(interns);
    } catch (error) {
      console.error("Error fetching user interns:", error);
      return res
        .status(500)
        .json({ message: "Error fetching user interns", error });
    }
  },
};

module.exports = InternController;
