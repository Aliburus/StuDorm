const db = require("../config/db");

const ContactAnswer = {
  create: async ({
    contact_message_id,
    answer,
    answered_email,
    answered_by,
  }) => {
    const [result] = await db.query(
      "INSERT INTO contact_answers (contact_message_id, answer, answered_email, answered_by) VALUES (?, ?, ?, ?)",
      [contact_message_id, answer, answered_email, answered_by]
    );
    return result;
  },
  getByMessageId: async (contact_message_id) => {
    const [rows] = await db.query(
      "SELECT * FROM contact_answers WHERE contact_message_id = ?",
      [contact_message_id]
    );
    return rows;
  },
};

module.exports = ContactAnswer;
