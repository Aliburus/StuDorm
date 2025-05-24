// models/ForumPosts.js
const db = require("../config/db");

const ForumPost = {
  // Yeni post oluşturma
  create: async ({ user_id, content }) => {
    const query = `
      INSERT INTO forum_posts
      (user_id, content, likes, dislikes, created_at)
      VALUES (?, ?, 0, 0, NOW())
    `;
    const [result] = await db.query(query, [user_id, content]);
    return result.insertId;
  },

  // ID ile post getirme
  getById: async (id) => {
    const query = `
      SELECT p.id, p.user_id, p.content, p.likes, p.dislikes, p.created_at, p.updated_at,
             u.name, u.surname
      FROM forum_posts p
      JOIN users u ON p.user_id = u.id
      WHERE p.id = ?
    `;
    const [rows] = await db.query(query, [id]);
    return rows[0];
  },

  // Tüm postları alma
  getAll: async () => {
    const query = `
      SELECT p.id, p.user_id, p.content, p.likes, p.dislikes, p.created_at, p.updated_at,
             u.name, u.surname, u.phone, u.email
      FROM forum_posts p
      JOIN users u ON p.user_id = u.id
      ORDER BY p.created_at DESC
    `;
    const [rows] = await db.query(query);
    return rows;
  },

  // Like sayısını artırma veya azaltma
  updateLikes: async (id, delta = 1) => {
    const query = `
      UPDATE forum_posts
      SET likes = GREATEST(likes + ?, 0)
      WHERE id = ?
    `;
    await db.query(query, [delta, id]);
  },

  // Dislike sayısını artırma veya azaltma
  updateDislikes: async (id, delta = 1) => {
    const query = `
      UPDATE forum_posts
      SET dislikes = GREATEST(dislikes + ?, 0)
      WHERE id = ?
    `;
    await db.query(query, [delta, id]);
  },

  // Toggle Like: aynı anda dislike'i de kaldır
  toggleLike: async (post_id, user_id) => {
    // Beğeni durumu
    const [liked] = await db.query(
      `SELECT * FROM forum_likes WHERE post_id = ? AND user_id = ?`,
      [post_id, user_id]
    );
    if (liked.length) {
      // Beğeniyi geri al
      await db.query(
        `DELETE FROM forum_likes WHERE post_id = ? AND user_id = ?`,
        [post_id, user_id]
      );
      await ForumPost.updateLikes(post_id, -1);
      return { toggled: false };
    }
    // Eğer dislike varsa onu geri al
    const [disliked] = await db.query(
      `SELECT * FROM forum_dislikes WHERE post_id = ? AND user_id = ?`,
      [post_id, user_id]
    );
    if (disliked.length) {
      await db.query(
        `DELETE FROM forum_dislikes WHERE post_id = ? AND user_id = ?`,
        [post_id, user_id]
      );
      await ForumPost.updateDislikes(post_id, -1);
    }
    // Yeni like ekle
    await db.query(`INSERT INTO forum_likes (post_id, user_id) VALUES (?, ?)`, [
      post_id,
      user_id,
    ]);
    await ForumPost.updateLikes(post_id, 1);
    return { toggled: true };
  },

  // Toggle Dislike: aynı anda like'ı da kaldır
  toggleDislike: async (post_id, user_id) => {
    const [disliked] = await db.query(
      `SELECT * FROM forum_dislikes WHERE post_id = ? AND user_id = ?`,
      [post_id, user_id]
    );
    if (disliked.length) {
      await db.query(
        `DELETE FROM forum_dislikes WHERE post_id = ? AND user_id = ?`,
        [post_id, user_id]
      );
      await ForumPost.updateDislikes(post_id, -1);
      return { toggled: false };
    }
    const [liked] = await db.query(
      `SELECT * FROM forum_likes WHERE post_id = ? AND user_id = ?`,
      [post_id, user_id]
    );
    if (liked.length) {
      await db.query(
        `DELETE FROM forum_likes WHERE post_id = ? AND user_id = ?`,
        [post_id, user_id]
      );
      await ForumPost.updateLikes(post_id, -1);
    }
    await db.query(
      `INSERT INTO forum_dislikes (post_id, user_id) VALUES (?, ?)`,
      [post_id, user_id]
    );
    await ForumPost.updateDislikes(post_id, 1);
    return { toggled: true };
  },

  // Top N postları getirme
  getTopPosts: async (limit = 5) => {
    const query = `
      SELECT p.id, p.content, p.likes, p.dislikes, p.created_at, 
             u.name, u.surname, u.phone, u.email
      FROM forum_posts p
      JOIN users u ON p.user_id = u.id
      ORDER BY p.likes DESC, p.created_at DESC
      LIMIT ?
    `;
    const [rows] = await db.query(query, [limit]);
    return rows;
  },

  // Kullanıcının postlarını getirme
  getPostByUserId: async (user_id) => {
    const query = `
      SELECT p.id, p.user_id, p.content, p.likes, p.dislikes, p.created_at, p.updated_at,
             u.name, u.surname
      FROM forum_posts p
      JOIN users u ON p.user_id = u.id
      WHERE p.user_id = ?
      ORDER BY p.created_at DESC
    `;
    const [rows] = await db.query(query, [user_id]);
    return rows;
  },

  // Post silme
  delete: async (id, adminId = null) => {
    // Önce yorumları sil
    await db.query("DELETE FROM forum_comments WHERE post_id = ?", [id]);
    // Sonra postu sil
    const query = `DELETE FROM forum_posts WHERE id = ?`;
    const [result] = await db.query(query, [id]);
    return result;
  },

  // Post güncelleme
  update: async (id, content) => {
    const query = `
      UPDATE forum_posts
      SET content = ?, updated_at = NOW()
      WHERE id = ?
    `;
    const [result] = await db.query(query, [content, id]);
    return result;
  },
};

// Yorum ekle
const addComment = async ({ post_id, user_id, comment }) => {
  const query = `INSERT INTO forum_comments (post_id, user_id, comment) VALUES (?, ?, ?)`;
  const [result] = await db.query(query, [post_id, user_id, comment]);
  return result.insertId;
};

// Posta ait yorumları getir
const getCommentsByPostId = async (post_id) => {
  const query = `
    SELECT fc.*, u.name, u.surname
    FROM forum_comments fc
    JOIN users u ON fc.user_id = u.id
    WHERE fc.post_id = ?
    ORDER BY fc.created_at ASC
  `;
  const [rows] = await db.query(query, [post_id]);
  return rows;
};

// Belirli bir yorumu sil
const deleteComment = async (commentId, adminId = null) => {
  const query = "DELETE FROM forum_comments WHERE id = ?";
  const [result] = await db.query(query, [commentId]);
  return result;
};

module.exports = {
  ...ForumPost,
  addComment,
  getCommentsByPostId,
  deleteComment,
};
