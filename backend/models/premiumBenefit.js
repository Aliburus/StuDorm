const db = require("../config/db");

class PremiumBenefit {
  static async getAll() {
    const [rows] = await db.query("SELECT * FROM premium_benefits LIMIT 1");
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.query(
      "SELECT * FROM premium_benefits WHERE id = ?",
      [id]
    );
    return rows[0];
  }

  static async create(benefit) {
    // Önce mevcut kayıtları kontrol et
    const [existing] = await db.query(
      "SELECT COUNT(*) as count FROM premium_benefits"
    );
    if (existing[0].count > 0) {
      throw new Error(
        "Zaten bir premium benefit kaydı var. Sadece güncelleme yapabilirsiniz."
      );
    }

    const { title, description, benefit_list, price, button_text } = benefit;
    const [result] = await db.query(
      "INSERT INTO premium_benefits (title, description, benefit_list, price, button_text) VALUES (?, ?, ?, ?, ?)",
      [title, description, benefit_list, price, button_text]
    );
    return result.insertId;
  }

  static async update(id, benefit) {
    const { title, description, benefit_list, price, button_text } = benefit;
    const [result] = await db.query(
      "UPDATE premium_benefits SET title = ?, description = ?, benefit_list = ?, price = ?, button_text = ? WHERE id = ?",
      [title, description, benefit_list, price, button_text, id]
    );
    return result.affectedRows > 0;
  }

  static async delete(id) {
    const [result] = await db.query(
      "DELETE FROM premium_benefits WHERE id = ?",
      [id]
    );
    return result.affectedRows > 0;
  }
}

module.exports = PremiumBenefit;
