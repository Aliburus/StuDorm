// src/pages/Users/AccountListingPage.js

import { useEffect, useState } from "react";
import {
  getYurtAdsByUserId,
  getInternsByUserId,
  getPartTimeAdsByUserId,
} from "../../services/ListingService";

const AccountListingsPage = ({ user }) => {
  const [yurtAds, setYurtAds] = useState([]);
  const [interns, setInterns] = useState([]);
  const [partTimeAds, setPartTimeAds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      if (user?.id) {
        try {
          const [yurtData, internData, partTimeData] = await Promise.all([
            getYurtAdsByUserId(user.id),
            getInternsByUserId(user.id),
            getPartTimeAdsByUserId(user.id),
          ]);
          setYurtAds(yurtData);
          setInterns(internData);
          setPartTimeAds(partTimeData);
        } catch (error) {
          console.error("Error fetching listings:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchListings();
  }, [user]);

  if (loading) {
    return <div>Yükleniyor…</div>;
  }

  if (!user) {
    return <div>Giriş yapmanız gerekiyor.</div>;
  }

  // Eğer hiç ilan yoksa genel mesaj göster
  const hasAnyAds = yurtAds.length || interns.length || partTimeAds.length;
  if (!hasAnyAds) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold">Mevcut ilan yok</h1>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">İlanlarım</h1>

      <div className="space-y-8">
        {/* Yurt İlanları */}
        {yurtAds.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">Yurt İlanları</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {yurtAds.map((ad) => (
                <div
                  key={`yurt-${ad.id}`}
                  className="border p-4 rounded-lg shadow"
                >
                  <h3 className="text-xl font-semibold">{ad.title}</h3>
                  <p className="mt-2 text-gray-600">{ad.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Staj İlanları */}
        {interns.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">Staj İlanları</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {interns.map((intern) => (
                <div
                  key={`intern-${intern.id}`}
                  className="border p-4 rounded-lg shadow"
                >
                  <h3 className="text-xl font-semibold">{intern.name}</h3>
                  <p className="mt-2 text-gray-600">{intern.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Part-Time İlanlar */}
        {partTimeAds.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">Part-Time İlanlar</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {partTimeAds.map((ad) => (
                <div
                  key={`pt-${ad.id}`}
                  className="border p-4 rounded-lg shadow"
                >
                  <h3 className="text-xl font-semibold">{ad.title}</h3>
                  <p className="mt-2 text-gray-600">{ad.description}</p>
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
