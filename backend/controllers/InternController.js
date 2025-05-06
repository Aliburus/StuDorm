// controllers/InternController.js
const InternAd = require("../models/InternAd");

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
      res.status(200).json(intern[0]);
    } catch (err) {
      res.status(500).json({ message: "Error fetching intern", error: err });
    }
  },

  createIntern: async (req, res) => {
    try {
      const {
        user_id,
        title,
        province,
        district,
        category,
        contact,
        description,
        duration,
        requirements,
      } = req.body;

      const newIntern = {
        user_id,
        title,
        province,
        district,
        category,
        contact,
        description,
        duration,
        requirements,
      };

      await InternAd.create(newIntern);
      res.status(201).json({ message: "Intern created successfully" });
    } catch (err) {
      res.status(500).json({ message: "Error creating intern", error: err });
    }
  },

  updateIntern: async (req, res) => {
    try {
      const internData = req.body;
      const internId = req.params.id;
      await InternAd.update(internId, internData);
      res.status(200).json({ message: "Intern updated successfully" });
    } catch (err) {
      res.status(500).json({ message: "Error updating intern", error: err });
    }
  },

  deleteIntern: async (req, res) => {
    try {
      await InternAd.delete(req.params.id);
      res.status(200).json({ message: "Intern deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: "Error deleting intern", error: err });
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
