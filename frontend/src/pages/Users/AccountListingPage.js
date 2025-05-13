import { useEffect, useState } from "react";
import {
  getYurtAdsByUserId,
  getInternsByUserId,
  getPartTimeAdsByUserId,
} from "../../services/ListingService";

const BASE_UPLOAD_URL = "http://localhost:5000";

const AccountListingsPage = ({ user }) => {
  const [yurtAds, setYurtAds] = useState([]);
  const [interns, setInterns] = useState([]);
  const [partTimeAds, setPartTimeAds] = useState([]);
  const [loading, setLoading] = useState(true);

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

        const formattedYurtAds = yurtData.map((ad) => ({
          ...ad,
          photos:
            ad.photos && Array.isArray(ad.photos)
              ? ad.photos.map((photo) => BASE_UPLOAD_URL + photo)
              : [],
        }));

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
      <div className="p-6">
        <h1 className="text-3xl font-bold">Mevcut ilanınız bulunmamaktadır.</h1>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">İlanlarım</h1>

      <div className="space-y-12">
        {/* Yurt İlanları */}
        {yurtAds.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">Yurt İlanları</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {yurtAds.map((ad) => (
                <div
                  key={`yurt-${ad.id}`}
                  className="border p-4 rounded-lg shadow hover:shadow-xl transition-all"
                >
                  <img
                    src={ad.photos[0] || "/default-image.jpg"}
                    alt={ad.title}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <h3 className="text-xl font-semibold">{ad.title}</h3>
                  <p className="mt-2 text-gray-600 line-clamp-3">
                    {ad.description}
                  </p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-gray-800 font-bold">
                      Fiyat: {ad.price} ₺
                    </span>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
                      Detaylar
                    </button>
                  </div>
                  {ad.photos.length > 1 && (
                    <div className="mt-4 flex space-x-2 overflow-x-auto">
                      {ad.photos.slice(1, 4).map((photo, index) => (
                        <img
                          key={index}
                          src={photo}
                          alt={`Fotoğraf ${index + 2}`}
                          className="w-20 h-20 object-cover rounded-md"
                        />
                      ))}
                    </div>
                  )}
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
                  className="border p-4 rounded-lg shadow hover:shadow-xl transition-all"
                >
                  <h3 className="text-xl font-semibold">{intern.name}</h3>
                  <p className="mt-2 text-gray-600 line-clamp-3">
                    {intern.description}
                  </p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-gray-800 font-bold">
                      Şirket: {intern.company}
                    </span>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
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
          <section>
            <h2 className="text-2xl font-semibold mb-4">Part-Time İlanlar</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {partTimeAds.map((ad) => (
                <div
                  key={`pt-${ad.id}`}
                  className="border p-4 rounded-lg shadow hover:shadow-xl transition-all"
                >
                  <h3 className="text-xl font-semibold">{ad.title}</h3>
                  <p className="mt-2 text-gray-600 line-clamp-3">
                    {ad.description}
                  </p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-gray-800 font-bold">
                      Saatlik Ücret: {ad.hourlyRate} ₺
                    </span>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
                      Detaylar
                    </button>
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
