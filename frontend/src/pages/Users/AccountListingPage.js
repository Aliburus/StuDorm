import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getYurtAdsByUserId,
  getInternsByUserId,
  getPartTimeAdsByUserId,
} from "../../services/ListingService";
import { Home, Briefcase, Clock, Image, Edit, Star } from "lucide-react";

const BASE_UPLOAD_URL = "http://localhost:5000";

const AccountListingsPage = ({ user }) => {
  const [yurtAds, setYurtAds] = useState([]);
  const [interns, setInterns] = useState([]);
  const [partTimeAds, setPartTimeAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListings = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      try {
        const [yurtData, internData, partTimeData] = await Promise.all([
          getYurtAdsByUserId(user.id),
          getInternsByUserId(user.id),
          getPartTimeAdsByUserId(user.id),
        ]);

        const formattedYurtAds = yurtData.map((ad) => {
          console.log("ad:", ad);
          let photoArr = [];
          if (Array.isArray(ad.images)) {
            photoArr = ad.images;
          } else if (Array.isArray(ad.photos)) {
            photoArr = ad.photos;
          }
          const photos = photoArr.map((p) =>
            p.startsWith("http") ? p : `${BASE_UPLOAD_URL}${p}`
          );
          return {
            ...ad,
            photos,
          };
        });

        setYurtAds(formattedYurtAds);
        setInterns(internData);
        setPartTimeAds(partTimeData);
      } catch (error) {
        console.error("İlanlar alınırken hata oluştu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [user]);

  if (loading) return <div className="p-6 text-lg">Yükleniyor…</div>;
  if (!user)
    return <div className="p-6 text-lg">Giriş yapmanız gerekiyor.</div>;

  const hasAnyAds = yurtAds.length || interns.length || partTimeAds.length;
  if (!hasAnyAds) {
    return (
      <div className="text-center py-12 bg-white rounded-xl shadow-sm">
        <Home className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 text-lg mb-6">
          Henüz ilan paylaşımınız bulunmuyor.
        </p>
        <button
          onClick={() => navigate("/dormAdForm")}
          className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 transform hover:-translate-y-1 shadow-md"
        >
          İlan Paylaş
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">İlanlarım</h1>

      <div className="space-y-12">
        {/* Kullanıcı adı ve rozet */}
        <div className="flex items-center mt-2">
          <span className="font-medium text-gray-800">
            {user.name} {user.surname}
          </span>
          {(user.isPremium || user.user_type === "premium") && (
            <Star
              className="w-4 h-4 ml-1 text-yellow-400"
              fill="#facc15"
              stroke="#facc15"
              title="Premium Üye"
            />
          )}
        </div>

        {/* Yurt İlanları */}
        {yurtAds.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">Yurt İlanları</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {yurtAds.map((ad) => (
                <div
                  key={`yurt-${ad.id}`}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group overflow-hidden flex flex-col"
                >
                  <div className="relative h-56 mb-4 bg-gray-100 flex items-center justify-center overflow-hidden">
                    {ad.images && ad.images.length > 0 ? (
                      <img
                        src={
                          ad.images[0].startsWith("http")
                            ? ad.images[0]
                            : `${BASE_UPLOAD_URL}${ad.images[0]}`
                        }
                        alt={ad.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://via.placeholder.com/400x300?text=No+Image";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        <Image className="w-16 h-16 text-gray-300" />
                      </div>
                    )}
                    {/* Küçük galeri önizlemesi */}
                    {ad.images && ad.images.length > 1 && (
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 bg-white/70 px-2 py-1 rounded-lg shadow">
                        {ad.images.slice(0, 4).map((img, idx) => (
                          <img
                            key={idx}
                            src={
                              img.startsWith("http")
                                ? img
                                : `${BASE_UPLOAD_URL}${img}`
                            }
                            alt={`thumb-${idx}`}
                            className="w-8 h-8 object-cover rounded-md border border-gray-200"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src =
                                "https://via.placeholder.com/100x100?text=No+Image";
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 flex flex-col px-4 pb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-1 truncate">
                      {ad.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {ad.description}
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                      <span className="text-lg font-bold text-yellow-600">
                        {ad.price} ₺
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => navigate(`/update/yurt/${ad.id}`)}
                          className="px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() =>
                            navigate(`/listing-details/room/${ad.id}`)
                          }
                          className="px-5 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg font-semibold shadow hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 hover:scale-105"
                        >
                          Detaylar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Staj İlanları */}
        {interns.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">Staj İlanları</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {interns.map((intern) => (
                <div
                  key={`intern-${intern.id}`}
                  className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center mb-4">
                    <Briefcase className="w-6 h-6 text-blue-500 mr-2" />
                    <h3 className="text-xl font-semibold">{intern.name}</h3>
                  </div>
                  <p className="text-gray-600 line-clamp-3 mb-4">
                    {intern.description}
                  </p>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <span className="text-gray-800 font-bold">
                      {intern.company}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/update/intern/${intern.id}`)}
                        className="px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() =>
                          navigate(`/listing-details/intern/${intern.id}`)
                        }
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        Detaylar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Part-Time İlanlar */}
        {partTimeAds.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">Part-Time İlanlar</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {partTimeAds.map((ad) => (
                <div
                  key={`pt-${ad.id}`}
                  className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center mb-4">
                    <Clock className="w-6 h-6 text-green-500 mr-2" />
                    <h3 className="text-xl font-semibold">{ad.title}</h3>
                  </div>
                  <p className="text-gray-600 line-clamp-3 mb-4">
                    {ad.description}
                  </p>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <span className="text-gray-800 font-bold">
                      {ad.hourlyRate} ₺/saat
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/update/parttime/${ad.id}`)}
                        className="px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() =>
                          navigate(`/listing-details/parttime/${ad.id}`)
                        }
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        Detaylar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default AccountListingsPage;
