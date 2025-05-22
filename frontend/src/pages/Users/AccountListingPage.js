import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getYurtAdsByUserId,
  getInternsByUserId,
  getPartTimeAdsByUserId,
  deleteYurtAd,
  deleteInternAd,
  deletePartTimeAd,
} from "../../services/ListingService";
import {
  Home,
  Briefcase,
  Clock,
  Image,
  Edit,
  Star,
  Trash2,
} from "lucide-react";

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

  const handleDelete = async (type, id) => {
    if (!window.confirm("Bu ilanı silmek istediğinizden emin misiniz?")) {
      return;
    }
    try {
      switch (type) {
        case "yurt":
          await deleteYurtAd(id);
          setYurtAds(yurtAds.filter((ad) => ad.id !== id));
          break;
        case "intern":
          await deleteInternAd(id);
          setInterns(interns.filter((intern) => intern.id !== id));
          break;
        case "parttime":
          await deletePartTimeAd(id);
          setPartTimeAds(partTimeAds.filter((ad) => ad.id !== id));
          break;
      }
    } catch (error) {
      alert("İlan silinirken bir hata oluştu");
    }
  };

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
    <div className="p-8 min-h-screen bg-gray-50 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-10 text-gray-900 tracking-tight self-start">
        İlanlarım
      </h1>
      {/* Yurt İlanları */}
      {yurtAds.length > 0 && (
        <section className="w-full max-w-5xl mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Home className="w-5 h-5 text-yellow-500" />
            <span className="text-lg font-semibold text-gray-700">
              Yurt İlanları
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {yurtAds.map((ad) => (
              <div
                key={`yurt-${ad.id}`}
                className="bg-white rounded-2xl shadow hover:shadow-lg border border-gray-100 transition-all duration-200 group flex flex-col w-80 hover:scale-105"
              >
                <div className="relative h-44 bg-gray-100 flex items-center justify-center overflow-hidden rounded-t-2xl">
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
                      <Image className="w-12 h-12 text-gray-300" />
                    </div>
                  )}
                  {ad.price && (
                    <span className="absolute top-3 right-3 bg-yellow-100 text-yellow-700 font-semibold px-3 py-0.5 rounded-md text-sm shadow-sm border border-yellow-200">
                      {ad.price} ₺
                    </span>
                  )}
                </div>
                <div className="flex-1 flex flex-col px-5 py-4">
                  <h3 className="text-base font-bold text-gray-900 mb-2 truncate">
                    {ad.title}
                  </h3>

                  <div className="flex items-center gap-1 text-gray-400 mb-3 text-xs">
                    <Home className="w-4 h-4 text-yellow-400" />
                    <span>
                      {ad.province}, {ad.district}
                    </span>
                  </div>
                  <div className="flex gap-2 mt-auto pt-3 border-t border-gray-100">
                    <button
                      onClick={() => navigate(`/update/yurt/${ad.id}`)}
                      className="p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 border border-gray-200 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete("yurt", ad.id)}
                      className="p-2 bg-red-50 text-red-500 rounded-full hover:bg-red-100 border border-red-100 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => navigate(`/listing-details/room/${ad.id}`)}
                      className="flex-1 py-2 bg-yellow-500 text-white rounded-full font-medium hover:bg-yellow-600 transition-colors text-xs"
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
      {/* Staj İlanları */}
      {interns.length > 0 && (
        <section className="w-full max-w-5xl mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Briefcase className="w-5 h-5 text-blue-500" />
            <span className="text-lg font-semibold text-gray-700">
              Staj İlanları
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {interns.map((intern) => (
              <div
                key={`intern-${intern.id}`}
                className="bg-white rounded-2xl shadow hover:shadow-lg border border-gray-100 transition-all duration-200 group flex flex-col w-80 hover:scale-105"
              >
                <div className="flex items-center gap-2 mt-5 px-5">
                  <Briefcase className="w-5 h-5 text-blue-500" />
                  <h3 className="text-base font-bold text-gray-900 truncate">
                    {intern.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2 text-gray-400 my-4 px-5 text-xs">
                  {intern.category && (
                    <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-md text-xs font-medium">
                      {intern.category}
                    </span>
                  )}
                  <span>
                    <Home className="w-4 h-4 text-yellow-400 inline-block mr-1" />
                    {intern.province}, {intern.district}
                  </span>
                </div>
                <div className="flex gap-2 mt-auto pt-3 border-t border-gray-100 px-5 pb-4">
                  <button
                    onClick={() => navigate(`/update/intern/${intern.id}`)}
                    className="p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 border border-gray-200 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete("intern", intern.id)}
                    className="p-2 bg-red-50 text-red-500 rounded-full hover:bg-red-100 border border-red-100 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() =>
                      navigate(`/listing-details/intern/${intern.id}`)
                    }
                    className="flex-1 py-2 bg-blue-500 text-white rounded-full font-medium hover:bg-blue-600 transition-colors text-xs"
                  >
                    Detaylar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
      {/* Part-Time İlanlar */}
      {partTimeAds.length > 0 && (
        <section className="w-full max-w-5xl mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-green-500" />
            <span className="text-lg font-semibold text-gray-700">
              Part-Time İlanlar
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partTimeAds.map((ad) => (
              <div
                key={`pt-${ad.id}`}
                className="bg-white rounded-2xl shadow hover:shadow-lg border border-gray-100 transition-all duration-200 group flex flex-col w-80 hover:scale-105"
              >
                <div className="flex items-center gap-2 mt-5 px-5">
                  <Clock className="w-5 h-5 text-green-500" />
                  <h3 className="text-base font-bold text-gray-900 truncate">
                    {ad.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2 text-gray-400 my-4 px-5 text-xs">
                  {ad.category && (
                    <span className="bg-green-50 text-green-600 px-2 py-0.5 rounded-md text-xs font-medium">
                      {ad.category}
                    </span>
                  )}
                  <span>
                    <Home className="w-4 h-4 text-yellow-400 inline-block mr-1" />
                    {ad.province}, {ad.district}
                  </span>
                </div>
                <div className="flex gap-2 mt-auto pt-3 border-t border-gray-100 px-5 pb-4">
                  <button
                    onClick={() => navigate(`/update/parttime/${ad.id}`)}
                    className="p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 border border-gray-200 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete("parttime", ad.id)}
                    className="p-2 bg-red-50 text-red-500 rounded-full hover:bg-red-100 border border-red-100 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() =>
                      navigate(`/listing-details/parttime/${ad.id}`)
                    }
                    className="flex-1 py-2 bg-green-500 text-white rounded-full font-medium hover:bg-green-600 transition-colors text-xs"
                  >
                    Detaylar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default AccountListingsPage;
