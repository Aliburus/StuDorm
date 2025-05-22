const deactivateUserPosts = async (userId) => {
  try {
    const query = `
      UPDATE posts 
      SET status = 'inactive', 
          updated_at = CURRENT_TIMESTAMP 
      WHERE user_id = ? AND status = 'active'
    `;
    await db.query(query, [userId]);
  } catch (error) {
    console.error("İlanları pasife alma hatası:", error);
    throw error;
  }
};

const deleteUserPosts = async (userId) => {
  try {
    const query = `DELETE FROM posts WHERE user_id = ?`;
    await db.query(query, [userId]);
  } catch (error) {
    console.error("Kullanıcı ilanlarını silme hatası:", error);
    throw error;
  }
};

module.exports = {
  create,
  findById,
  update,
  delete: deletePost,
  deactivateUserPosts,
  deleteUserPosts,
};
