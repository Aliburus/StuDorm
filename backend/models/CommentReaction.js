const db = require("../config/db");

const CommentReaction = {
  addReaction: async ({ user_id, comment_id, reaction }) => {
    await db.query(
      "INSERT INTO comment_reactions (user_id, comment_id, reaction) VALUES (?, ?, ?)",
      [user_id, comment_id, reaction]
    );
  },

  removeReaction: async ({ user_id, comment_id }) => {
    await db.query(
      "DELETE FROM comment_reactions WHERE user_id = ? AND comment_id = ?",
      [user_id, comment_id]
    );
  },
};

module.exports = CommentReaction;
