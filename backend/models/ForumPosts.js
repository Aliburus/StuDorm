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

  // Tüm postları alma
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
      return result.affectedRows;
    } catch (err) {
      throw err;
    }
  },

  // Kullanıcının postlarını getirme
  getPostByUserId: async (user_id) => {
    try {
      const query =
        "SELECT id, user_id, content, created_at, likes, dislikes FROM forum_posts WHERE user_id = ?";
      const [results] = await db.query(query, [user_id]);
      return results;
    } catch (err) {
      console.error("Error in getPostByUserId:", err);
      throw err;
    }
  },

  delete: async (id) => {
    try {
      const query = `
        DELETE FROM forum_posts 
        WHERE id = ?
      `;
      const [result] = await db.query(query, [id]);
      return result; // Silme işleminden sonra dönen sonucu
    } catch (err) {
      throw new Error(`Post silinirken hata oluştu: ${err.message}`);
    }
  },
  updateContent: async (id, content) => {
    try {
      const query = `
        UPDATE forum_posts
        SET content = ?
        WHERE id = ?
      `;
      const [result] = await db.query(query, [content, id]);
      return result.affectedRows; // Güncellenen satır sayısını döndürüyoruz
    } catch (err) {
      throw new Error(`Post güncellenirken hata oluştu: ${err.message}`);
    }
  },
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
