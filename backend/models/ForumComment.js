const db = require("../config/db");

const ForumComment = {
  create: async ({ user_id, post_id, content }) => {
    const [result] = await db.query(
      "INSERT INTO forum_comments (user_id, post_id, content) VALUES (?, ?, ?)",
      [user_id, post_id, content]
    );
    return result.insertId;
  },

  getAllComments: async () => {
    const [rows] = await db.query(
      "SELECT * FROM forum_comments ORDER BY created_at DESC"
    );
    return rows;
  },
};

module.exports = ForumComment;
