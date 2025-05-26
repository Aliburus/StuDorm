import React from "react";
import Slider from "react-slick";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Crown, MapPin, DollarSign, Star } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { PremiumService } from "../services/PremiumService";

const PremiumListings = () => {
  const navigate = useNavigate();
  const [premiumListings, setPremiumListings] = useState([]);
  const placeholderImages = [
    "https://img.freepik.com/free-vector/internship-job-concept_23-2148737067.jpg",
    "https://img.freepik.com/free-vector/internship-job-concept-illustration_23-2148754785.jpg",
    "https://img.freepik.com/free-vector/internship-job-illustration_52683-51046.jpg?w=360",
  ];
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listings = await PremiumService.getPremiumListings(10);
        setPremiumListings(listings);
      } catch (err) {
        console.error(err);
      }
    };
    fetchListings();
  }, []);

  const handleListingClick = (listing) => {
    let type = listing.type;
    if (type === "dorm") type = "room";
    if (type === "internship") type = "intern";
    navigate(`/listing-details/${type}/${listing.id}`);
  };

  return (
    <div className="bg-gray-100 py-16">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-semibold">Premium Listelemeler</h2>
          <div className="flex items-center text-yellow-500">
            <Crown className="w-6 h-6 mr-2" />
            <span className="font-semibold">Premium Üyeler İçin</span>
          </div>
        </div>

        <Slider {...sliderSettings}>
          {premiumListings.map((ad, index) => {
            // Fotoğraf ve fiyat verilerinin kontrolü
            let imageToShow =
              placeholderImages[index % placeholderImages.length];
            if (ad.type === "dorm" && ad.photos) {
              const firstPhoto = Array.isArray(ad.photos)
                ? ad.photos[0]
                : (ad.photos || "").split(",")[0];
              if (
                firstPhoto &&
                firstPhoto !== "null" &&
                firstPhoto !== "undefined"
              ) {
                imageToShow = firstPhoto.startsWith("http")
                  ? firstPhoto
                  : `${process.env.REACT_APP_BASE_URL}${firstPhoto}`;
              }
            } else if (ad.photos && ad.photos.length > 0) {
              imageToShow = ad.photos.split(",")[0];
            }
            // Location bilgisi: province ve district'i birleştiriyoruz
            const location = `${ad.province}, ${ad.district}`;

            return (
              <div key={`${ad.type}-${ad.id}`} className="p-2 h-full">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col h-[500px]">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={imageToShow}
                      alt={ad.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          placeholderImages[index % placeholderImages.length];
                      }}
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center mb-2">
                      <Star className="w-5 h-5 text-yellow-500 mr-2" />
                      <span className="text-sm font-semibold text-yellow-500">
                        {ad.type === "dorm"
                          ? "Yurt"
                          : ad.type === "parttime"
                          ? "Part-Time İş"
                          : ad.type === "internship"
                          ? "Staj"
                          : "İlan"}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{ad.title}</h3>
                    <div className="flex items-center mb-2 text-gray-600">
                      <MapPin className="w-4 h-4 mr-1" />
                      {location}
                    </div>
                    {ad.price && (
                      <div className="flex items-center mb-4 text-gray-600">
                        <span className="mr-1 text-lg font-bold">₺</span>{" "}
                        {ad.price}
                      </div>
                    )}
                    {ad.description && (
                      <p className="mb-4 text-gray-600 text-sm">
                        {ad.description}
                      </p>
                    )}
                    {ad.duration && (
                      <div className="mb-4 text-gray-600 text-sm">
                        <strong>Duration:</strong> {ad.duration}
                      </div>
                    )}
                    {/* Kullanıcı adı ve rozet */}
                    {ad.owner_name && (
                      <div className="flex items-center mt-2">
                        <span className="font-medium text-gray-800">
                          {ad.owner_name}
                        </span>
                        {(ad.user_isPremium || ad.user_type === "premium") && (
                          <Star
                            className="w-4 h-4 ml-1 text-yellow-400"
                            fill="#facc15"
                            stroke="#facc15"
                            title="Premium Üye"
                          />
                        )}
                      </div>
                    )}
                    <button
                      onClick={() => handleListingClick(ad)}
                      className="mt-auto w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-semibold py-2 rounded-lg hover:from-yellow-500 hover:to-yellow-600"
                    >
                      Detayları Görüntüle
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default PremiumListings;
