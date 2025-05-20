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
    const type = listing.type === "dorm" ? "room" : listing.type;
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
            const imageToShow =
              ad.photos && ad.photos.length > 0
                ? ad.photos.split(",")[0] // fotosu birden fazla ise, ilkini alıyoruz
                : placeholderImages[index % placeholderImages.length];

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
                      {location} {/* location bilgisi burada gösterilecek */}
                    </div>
                    {ad.price && (
                      <div className="flex items-center mb-4 text-gray-600">
                        <DollarSign className="w-4 h-4 mr-1" /> {ad.price}
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
