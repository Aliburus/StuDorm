const db = require("../config/db");

const ForumPost = {
  // Yeni post oluşturma
  create: async (post) => {
    try {
      const { user_id, content, likes = 0, dislikes = 0 } = post;

      const query = `
        INSERT INTO forum_posts 
        (user_id, content, likes, dislikes, created_at) 
        VALUES (?, ?, ?, ?, NOW())
      `;

      const [result] = await db.query(query, [
        user_id,
        content,
        likes,
        dislikes,
      ]);

      return result.insertId; // Postun ID'sini döndürüyoruz
    } catch (err) {
      throw new Error(`Post eklerken hata oluştu: ${err.message}`);
    }
  },

  // Postu id ile getirme
  getById: async (id) => {
    try {
      const query = `
        SELECT id, user_id, content, likes, dislikes, created_at 
        FROM forum_posts 
        WHERE id = ?
      `;
      const [rows] = await db.query(query, [id]);
      return rows[0]; // Tek bir post döndürüyoruz
    } catch (err) {
      throw err;
    }
  },
  getAll: async () => {
    try {
      const query = `
        SELECT p.id, p.content, p.created_at, p.likes, p.dislikes, u.name, u.surname
        FROM forum_posts p
        JOIN users u ON p.user_id = u.id
        ORDER BY p.created_at DESC
      `;
      const [rows] = await db.query(query);
      return rows; // Tüm postları ve kullanıcı bilgilerini döndürüyoruz
    } catch (err) {
      throw err;
    }
  },

  // Like artırma
  updateLikes: async (id) => {
    try {
      const query = `
        UPDATE forum_posts 
        SET likes = likes + 1
        WHERE id = ?
      `;
      const [result] = await db.query(query, [id]);
      return result.affectedRows; // Etkilenen satır sayısını döndürüyoruz
    } catch (err) {
      throw err;
    }
  },
  getPostByUserId: async (user_id) => {
    try {
      const query = `
        SELECT p.id, p.content, p.created_at, p.likes, p.dislikes, u.name, u.surname
        FROM forum_posts p
        JOIN users u ON p.user_id = u.id
        WHERE p.user_id = ?  // Kullanıcıya özel postları filtrele
        ORDER BY p.created_at DESC
      `;
      const [rows] = await db.query(query, [user_id]);
      return rows; // Sadece giriş yapan kullanıcının postlarını döndürüyoruz
    } catch (err) {
      throw err;
    }
  },
  // Dislike artırma
  updateDislikes: async (id) => {
    try {
      const query = `
        UPDATE forum_posts 
        SET dislikes = dislikes + 1
        WHERE id = ?
      `;
      const [result] = await db.query(query, [id]);
      return result.affectedRows;
    } catch (err) {
      throw err;
    }
  },
};

module.exports = ForumPost;
