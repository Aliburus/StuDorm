const db = require("../config/db");

const getUsersWithPartTimeAds = async (req, res) => {
  try {
    const query = `
            SELECT 
                users.id AS user_id, users.name, users.surname, users.email, users.user_type, users.created_at, 
                parttimeads.id AS advert_id, parttimeads.title, parttimeads.description, 
                parttimeads.salary, parttimeads.location, parttimeads.status, parttimeads.is_hidden, 
                parttimeads.is_premium, parttimeads.created_at AS advert_created_at
            FROM users
            INNER JOIN parttimeads ON users.id = parttimeads.user_id
            ORDER BY parttimeads.created_at DESC;
        `;

    const [rows] = await db.query(query);

    // Kullanıcıları gruplandırarak JSON formatına uygun hale getir
    const usersWithAds = rows.reduce((acc, row) => {
      let user = acc.find((u) => u.user_id === row.user_id);
      if (!user) {
        user = {
          user_id: row.user_id,
          name: row.name,
          surname: row.surname,
          email: row.email,
          user_type: row.user_type,
          created_at: row.created_at,
          partTimeAds: [],
        };
        acc.push(user);
      }

      user.partTimeAds.push({
        advert_id: row.advert_id,
        title: row.title,
        description: row.description,
        salary: row.salary,
        location: row.location,
        status: row.status,
        is_hidden: row.is_hidden,
        is_premium: row.is_premium,
        created_at: row.advert_created_at,
      });

      return acc;
    }, []);

    res.status(200).json(usersWithAds);
  } catch (error) {
    console.error("Error fetching users with part-time ads:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getUsersWithYurtAds = async (req, res) => {
  try {
    const query = `
            SELECT 
                users.id AS user_id, users.name, users.surname, users.email, users.user_type, users.created_at, 
                yurtads.id AS yurt_ad_id, yurtads.title, yurtads.description, yurtads.price, 
                yurtads.location, yurtads.gender_required, yurtads.status, yurtads.is_hidden, 
                yurtads.is_premium, yurtads.created_at AS yurt_created_at,
                yurtadphotos.photo_url
            FROM users
            INNER JOIN yurtads ON users.id = yurtads.user_id
            LEFT JOIN yurtadphotos ON yurtads.id = yurtadphotos.yurt_ad_id
            ORDER BY yurtads.created_at DESC;
        `;

    const [rows] = await db.query(query);

    // Kullanıcıları gruplandırarak JSON formatına uygun hale getir
    const usersWithYurtAds = rows.reduce((acc, row) => {
      let user = acc.find((u) => u.user_id === row.user_id);
      if (!user) {
        user = {
          user_id: row.user_id,
          name: row.name,
          surname: row.surname,
          email: row.email,
          user_type: row.user_type,
          created_at: row.created_at,
          yurtAds: [],
        };
        acc.push(user);
      }

      let ad = user.yurtAds.find((ad) => ad.yurt_ad_id === row.yurt_ad_id);
      if (!ad) {
        ad = {
          yurt_ad_id: row.yurt_ad_id,
          title: row.title,
          description: row.description,
          price: row.price,
          location: row.location,
          gender_required: row.gender_required,
          status: row.status,
          is_hidden: row.is_hidden,
          is_premium: row.is_premium,
          created_at: row.yurt_created_at,
          photos: [],
        };
        user.yurtAds.push(ad);
      }

      if (row.photo_url) {
        ad.photos.push(row.photo_url);
      }

      return acc;
    }, []);

    res.status(200).json(usersWithYurtAds);
  } catch (error) {
    console.error("Error fetching users with yurt ads:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = { getUsersWithPartTimeAds, getUsersWithYurtAds };
