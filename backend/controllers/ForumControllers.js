const db = require("../config/db");

const getCommentsWithUserAndReactions = async (req, res) => {
  try {
    const query = `
      SELECT 
        fc.id AS comment_id, 
        fc.content AS comment_text, 
        fc.created_at AS comment_date,
        u.id AS user_id, 
        u.name, 
        u.surname, 
        u.email,
        fp.id AS post_id,
        fp.title AS post_title,
        COALESCE(likes.count, 0) AS like_count,
        COALESCE(dislikes.count, 0) AS dislike_count
      FROM forum_comments fc
      JOIN users u ON fc.user_id = u.id
      JOIN forum_posts fp ON fc.post_id = fp.id
      LEFT JOIN (
        SELECT comment_id, COUNT(*) AS count 
        FROM comment_reactions 
        WHERE reaction = 'like' 
        GROUP BY comment_id
      ) AS likes ON fc.id = likes.comment_id
      LEFT JOIN (
        SELECT comment_id, COUNT(*) AS count 
        FROM comment_reactions 
        WHERE reaction = 'dislike' 
        GROUP BY comment_id
      ) AS dislikes ON fc.id = dislikes.comment_id
      ORDER BY fc.created_at DESC;
    `;

    const [rows] = await db.query(query);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Yorumları alırken hata oluştu:", error);
    res.status(500).json({ error: "Yorumları alırken hata oluştu." });
  }
};

module.exports = { getCommentsWithUserAndReactions };
