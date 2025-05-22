const deleteUserMessages = async (userId) => {
  try {
    const query = `DELETE FROM messages WHERE sender_id = ? OR receiver_id = ?`;
    await db.query(query, [userId, userId]);
  } catch (error) {
    console.error("Kullanıcı mesajlarını silme hatası:", error);
    throw error;
  }
};

module.exports = {
  create,
  findById,
  update,
  delete: deleteMessage,
  deleteUserMessages,
};
