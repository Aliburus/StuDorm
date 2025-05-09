const db = require("../config/db");

const getRandomPremiumUserAds = async (limit = 10) => {
  limit = parseInt(limit, 15) || 10; // güvenli tamsayıya çevir

  const yurtadsQuery = `
  SELECT 
    ya.id,
    'dorm' AS type,
    ya.title,
    ya.province,
    ya.district,
    ya.price,
    GROUP_CONCAT(yp.photo_url) AS photos,
    ya.created_at
  FROM yurtads ya
  LEFT JOIN yurtadphotos yp ON ya.id = yp.yurt_ad_id
  INNER JOIN users u ON ya.user_id = u.id
  WHERE u.user_type = 'premium'
    AND ya.status = 'active'
    AND ya.is_hidden = 0
  GROUP BY ya.id
`;

  const parttimeQuery = `
  SELECT 
    pa.id,
    'parttime' AS type,
    pa.title,
    pa.province,
    pa.district,
    pa.price,
    NULL AS photos,
    pa.created_at
  FROM parttimeads pa
  INNER JOIN users u ON pa.user_id = u.id
  WHERE u.user_type = 'premium'
`;

  const internsQuery = `
  SELECT 
    i.id,
    'internship' AS type,
    i.title,
    i.province,
    i.district,
    NULL AS price,
    NULL AS photos,
    i.created_at
  FROM interns i
  INNER JOIN users u ON i.user_id = u.id
  WHERE u.user_type = 'premium'
`;

  const sql = `
  SELECT *
  FROM (
    ${yurtadsQuery}
    UNION ALL
    ${parttimeQuery}
    UNION ALL
    ${internsQuery}
  ) AS combined
  ORDER BY RAND()
  LIMIT ${limit}
`;

  const [rows] = await db.query(sql);
  return rows;
};

module.exports = { getRandomPremiumUserAds };
