const db = require("../config/db"); // Veritabanı bağlantısı

const PartTimeAdvert = {
  create: (advert, callback) => {
    const { user_id, title, description, salary, location, requirements } =
      advert;

    // Veritabanına yeni ilan eklemek için SQL sorgusu
    const query = `
    INSERT INTO  parttimeads
    ( title, description, salary, location, requirements)
    VALUES ( ?, ?, ?, ?, ?)
  `;

    // Veritabanına veri ekleme
    db.query(
      query,
      [title, description, salary, location, requirements],
      callback
    );
  },

  // Diğer CRUD işlemleri (eğer gerekiyorsa)
  // Örneğin ilanları listeleme, güncelleme, silme vb.
};

module.exports = PartTimeAdvert;
