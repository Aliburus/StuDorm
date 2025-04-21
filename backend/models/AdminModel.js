// models/AdminModel.js
const db = require("../config/db"); // `require` ile içe aktar

module.exports = {
  getAllUsers: async () => {
    const query = `SELECT id, name, surname, email, user_type, created_at FROM users`;
    const [rows] = await db.query(query);
    return rows;
  },
};
module.exports.getAllListings = async () => {
  const [rows] = await db.query(`
    SELECT
      CONCAT('yurtads-', id) AS unique_id,
      'yurtads' AS source,
      title,
      'dorm' AS category,
      province,
      district,
      NULL AS contact,
      description,
      NULL AS duration,
      NULL AS requirements,
      created_at,
      user_id,
      price,
      status
    FROM yurtads

    UNION ALL

    SELECT
      CONCAT('parttimeads-', id) AS unique_id,
      'parttimeads' AS source,
      title,
      category,
      province,
      district,
      contact,
      description,
      duration,
      requirements,
      created_at,
      user_id,
      price,
      'active' AS status
    FROM parttimeads

    UNION ALL

    SELECT
      CONCAT('interns-', id) AS unique_id,
      'interns' AS source,
      name AS title,
      category,
      location AS province,
      NULL AS district,
      contact,
      description,
      duration,
      requirements,
      created_at,
      user_id,
      NULL AS price,
      'active' AS status
    FROM interns
  `);
  return rows;
};
module.exports.getOverviewStats = async () => {
  const [[userStats]] = await db.query(`
    SELECT
      COUNT(*) AS totalUsers,
      SUM(user_type = 'premium') AS premiumUsers,
      SUM(user_type = 'basic') AS basicUsers
    FROM users
  `);

  const [[listingCounts]] = await db.query(`
    SELECT
      (SELECT COUNT(*) FROM yurtads) +
      (SELECT COUNT(*) FROM parttimeads) +
      (SELECT COUNT(*) FROM interns) AS totalListings,
      (SELECT COUNT(*) FROM yurtads) AS dormListings,
      (SELECT COUNT(*) FROM parttimeads) AS partTimeListings,
      (SELECT COUNT(*) FROM interns) AS internListings,
      (SELECT COUNT(*) FROM yurtads WHERE status = 'pending') AS pendingApprovals
  `);

  const [[forumStats]] = await db.query(`
    SELECT
      COUNT(*) AS totalPosts,
      COUNT(CASE WHEN dislikes > 3 THEN 1 END) AS reportedContent
    FROM forum_posts
  `);

  return {
    ...userStats,
    ...listingCounts,
    ...forumStats,
    roommateListings: 0, // Eğer roommate tablosu yoksa
  };
};
module.exports.deleteListing = async (source, id) => {
  let table,
    column = "id";
  if (source === "yurtads") table = "yurtads";
  else if (source === "parttimeads") table = "parttimeads";
  else if (source === "interns") table = "interns";
  else throw new Error("Invalid source");

  const query = `DELETE FROM ${table} WHERE ${column} = ?`;
  await db.query(query, [id]);
};

module.exports.updateListingDetails = async (source, id, fields) => {
  // Hangi tabloya gideceğini belirle
  let table;
  if (source === "yurtads") table = "yurtads";
  else if (source === "parttimeads") table = "parttimeads";
  else if (source === "interns") table = "interns";
  else throw new Error("Invalid source");

  // Sadece geçerli kolonları al (injection önlemek için)
  const allowedCols = {
    yurtads: [
      "title",
      "province",
      "district",
      "description",
      "price",
      "status",
    ],
    parttimeads: [
      "title",
      "category",
      "province",
      "district",
      "contact",
      "description",
      "duration",
      "requirements",
      "price",
      "status",
    ],
    interns: [
      "name",
      "category",
      "location",
      "contact",
      "description",
      "duration",
      "requirements",
      "status",
    ],
  }[source];

  const setClauses = [];
  const params = [];
  for (let key of Object.keys(fields)) {
    if (allowedCols.includes(key)) {
      setClauses.push(`\`${key}\` = ?`);
      params.push(fields[key]);
    }
  }
  if (setClauses.length === 0) throw new Error("No valid fields to update");

  const sql = `UPDATE ${table} SET ${setClauses.join(", ")} WHERE id = ?`;
  params.push(id);
  await db.query(sql, params);
};
