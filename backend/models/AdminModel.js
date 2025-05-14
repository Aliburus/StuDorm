const db = require("../config/db");
const AdminModel = {
  getAllUsers: async () => {
    const query = `SELECT id, name, surname, email, user_type, created_at FROM users`;
    const [rows] = await db.query(query);
    return rows;
  },

  getAllListings: async () => {
    const [rows] = await db.query(`
    SELECT
      CONCAT('yurtads-', id) AS unique_id,
      'yurtads' AS source,
      title,
      'dorm' AS category,
      province,
      district,
      NULL AS contact,  -- yurtads tablosunda contact sütunu kaldırıldı, NULL olarak bırakıldı
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
      NULL AS contact,  -- parttimeads tablosunda contact sütunu kaldırıldı, NULL olarak bırakıldı
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
      title,
      category,
      province,
      district,
      NULL AS contact,  -- interns tablosunda contact sütunu kaldırıldı, NULL olarak bırakıldı
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
  },

  getOverviewStats: async () => {
    const [[userStats]] = await db.query(`
      SELECT
        COUNT(*) AS totalUsers,
        SUM(user_type = 'premium') AS premiumUsers,
        SUM(user_type = 'normal') AS basicUsers
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
        COUNT(CASE WHEN dislikes > 50 THEN 1 END) AS reportedContent
      FROM forum_posts
    `);

    return {
      ...userStats,
      ...listingCounts,
      ...forumStats,
      roommateListings: 0,
    };
  },

  deleteListing: async (source, id) => {
    let table;
    if (source === "yurtads") table = "yurtads";
    else if (source === "parttimeads") table = "parttimeads";
    else if (source === "interns") table = "interns";
    else throw new Error("Invalid source");

    const query = `DELETE FROM ${table} WHERE id = ?`;
    await db.query(query, [id]);
  },

  updateListingDetails: async (source, id, fields) => {
    let table;
    if (source === "yurtads") table = "yurtads";
    else if (source === "parttimeads") table = "parttimeads";
    else if (source === "interns") table = "interns";
    else throw new Error("Invalid source");

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
        "title",
        "category",
        "province",
        "district",
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
  },
  getAllPosts: async () => {
    const [rows] = await db.query(`
      SELECT
        fp.id,
        fp.content,
        fp.created_at,
        fp.user_id,
        fp.likes,
        fp.dislikes,
        u.name,
        u.surname
      FROM forum_posts fp
      JOIN users u ON fp.user_id = u.id
    `);
    return rows;
  },
  deleteUser: async (id) => {
    const query = `DELETE FROM users WHERE id = ?`;
    await db.query(query, [id]);
  },
};

module.exports = AdminModel;
