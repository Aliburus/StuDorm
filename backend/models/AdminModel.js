const db = require("../config/db");
const YurtAd = require("../models/YurtAd");
const PartTimeAdvert = require("../models/PartTimeAdvert");
const InternAd = require("../models/InternAd");
const AdminModel = {
  getAllUsers: async () => {
    const query = `SELECT id, name, surname, email, user_type, premium_price, created_at FROM users`;
    const [rows] = await db.query(query);
    return rows;
  },

  getAllListings: async () => {
    try {
      const yurtAds = await YurtAd.getAllAdmin();
      const partTimeAds = await PartTimeAdvert.getAllAdmin();
      const internAds = await InternAd.getAllAdmin();
      const rows = [
        ...yurtAds.map((y) => ({
          unique_id: `yurtads-${y.id}`,
          source: "yurtads",
          title: y.title,
          category: "Yurt İlanı",
          province: y.province,
          district: y.district,
          contact: null,
          description: y.description,
          duration: null,
          requirements: null,
          created_at: y.created_at,
          user_id: y.user_id,
          price: y.price,
          status: y.status,
          photos: null, // YurtAdPhotos için ayrıca GROUP_CONCAT yapılabilir
        })),
        ...partTimeAds.map((p) => ({
          unique_id: `parttimeads-${p.id}`,
          source: "parttimeads",
          title: p.title,
          category: "Part-time İş",
          province: p.province,
          district: p.district,
          contact: null,
          description: p.description,
          duration: p.duration,
          requirements: p.requirements,
          created_at: p.created_at,
          user_id: p.user_id,
          price: p.price,
          status: p.status,
          photos: null,
        })),
        ...internAds.map((i) => ({
          unique_id: `interns-${i.id}`,
          source: "interns",
          title: i.title,
          category: "Staj İlanı",
          province: i.province,
          district: i.district,
          contact: null,
          description: i.description,
          duration: i.duration,
          requirements: i.requirements,
          created_at: i.created_at,
          user_id: i.user_id,
          price: null,
          status: i.status,
          photos: null,
        })),
      ];
      console.log(
        "AdminModel getAllListings result:",
        JSON.stringify(rows, null, 2)
      );
      return rows;
    } catch (error) {
      console.error("AdminModel getAllListings error:", error);
      throw error;
    }
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

    // Premium gelir hesaplama (yeni)
    const [[premiumStats]] = await db.query(`
      SELECT 
        SUM(u.premium_price) as total_revenue,
        MAX(u.premium_price) as premiumPrice
      FROM users u
      WHERE u.user_type = 'premium'
    `);

    return {
      ...userStats,
      ...listingCounts,
      ...forumStats,
      roommateListings: 0,
      premiumRevenue: premiumStats?.total_revenue || 0,
      premiumPrice: premiumStats?.premiumPrice || 0,
    };
  },

  deleteListing: async (source, id) => {
    let table;
    if (source === "yurtads") table = "yurtads";
    else if (source === "parttimeads") table = "parttimeads";
    else if (source === "interns") table = "interns";
    else throw new Error("Invalid source");

    const query = `UPDATE ${table} SET status = 'deleted' WHERE id = ?`;
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
  deleteForumPost: async (id) => {
    const query = `DELETE FROM forum_posts WHERE id = ?`;
    await db.query(query, [id]);
  },
  getListingStatsByCity: async () => {
    const [rows] = await db.query(`
      SELECT 
        province as city,
        COUNT(*) as total_listings,
        SUM(CASE WHEN source = 'yurtads' THEN 1 ELSE 0 END) as dorm_listings,
        SUM(CASE WHEN source = 'parttimeads' THEN 1 ELSE 0 END) as parttime_listings,
        SUM(CASE WHEN source = 'interns' THEN 1 ELSE 0 END) as intern_listings
      FROM (
        SELECT 'yurtads' as source, province FROM yurtads
        UNION ALL
        SELECT 'parttimeads' as source, province FROM parttimeads
        UNION ALL
        SELECT 'interns' as source, province FROM interns
      ) as all_listings
      GROUP BY province
      ORDER BY total_listings DESC
    `);
    return rows;
  },

  getPremiumRevenueByMonth: async () => {
    const [rows] = await db.query(`
      SELECT 
        DATE_FORMAT(u.updated_at, '%Y-%m') as month,
        SUM(u.premium_price) as total_revenue
      FROM users u
      WHERE u.user_type = 'premium'
      GROUP BY month
      ORDER BY month ASC
    `);
    return rows;
  },

  getPremiumRevenueByCity: async () => {
    const [rows] = await db.query(`
      SELECT 
        COALESCE(province, 'Belirtilmemiş') as city,
        SUM(u.premium_price) as total_revenue
      FROM (
        SELECT province, user_id FROM yurtads
        UNION ALL
        SELECT province, user_id FROM parttimeads
        UNION ALL
        SELECT province, user_id FROM interns
      ) as all_listings
      JOIN users u ON u.id = all_listings.user_id
      WHERE u.user_type = 'premium'
      GROUP BY province
      ORDER BY total_revenue DESC
    `);
    return rows;
  },

  getUserAndListingTrendsByMonth: async () => {
    const [userRows] = await db.query(`
      SELECT DATE_FORMAT(created_at, '%Y-%m') as month, COUNT(*) as new_users
      FROM users
      GROUP BY month
      ORDER BY month ASC
    `);
    const [listingRows] = await db.query(`
      SELECT month, SUM(count) as total_listings FROM (
        SELECT DATE_FORMAT(created_at, '%Y-%m') as month, COUNT(*) as count FROM yurtads GROUP BY month
        UNION ALL
        SELECT DATE_FORMAT(created_at, '%Y-%m') as month, COUNT(*) as count FROM parttimeads GROUP BY month
        UNION ALL
        SELECT DATE_FORMAT(created_at, '%Y-%m') as month, COUNT(*) as count FROM interns GROUP BY month
      ) as all_listings
      GROUP BY month
      ORDER BY month ASC
    `);
    // Ayları birleştir
    const allMonths = Array.from(
      new Set([
        ...userRows.map((r) => r.month),
        ...listingRows.map((r) => r.month),
      ])
    ).sort();
    return allMonths.map((month) => ({
      month,
      new_users: userRows.find((r) => r.month === month)?.new_users || 0,
      total_listings:
        listingRows.find((r) => r.month === month)?.total_listings || 0,
    }));
  },
};

module.exports = AdminModel;
