import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  Building2,
  Users,
  MessageSquare,
  Crown,
  MapPin,
  DollarSign,
  Star,
  Heart,
  ThumbsDown,
  Briefcase,
} from "lucide-react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { PremiumService } from "../services/PremiumService";
import { getTopForumPosts } from "../services/ForumService";
import HeroSection from "../components/HeroSection";

function Homepage() {
  const [premiumListings, setPremiumListings] = useState([]);
  const [topPosts, setTopPosts] = useState([]);

  useEffect(() => {
    const fetchTopPosts = async () => {
      const data = await getTopForumPosts();
      setTopPosts(data);
    };

    fetchTopPosts();
  }, []);
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
  const features = [
    {
      icon: <Building2 className="w-8 h-8" />,
      title: "Yurtlar",
      description: "Keşfedin ve ihtiyaçlarınıza uygun yurtları bulun",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Oda Arkadaşları",
      description: "Bağlantı kurun ve yeni arkadaşlar edinin",
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: "Staj İlanları - İş Fırsatları",
      description: "Fırsatları keşfedin ve kariyerinize yön verin",
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Öğrenci Topluluğu",
      description: "Katılın, tartışın ve bilgi paylaşın",
    },
  ];
  const placeholderImages = [
    "https://img.freepik.com/free-vector/internship-job-concept_23-2148737067.jpg",
    "https://img.freepik.com/free-vector/internship-job-concept-illustration_23-2148754785.jpg",
    "https://img.freepik.com/free-vector/internship-job-illustration_52683-51046.jpg?w=360",
  ];

  // src/constants/placeholderImages.js

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <HeroSection />

      {/* Features Grid */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-yellow-500 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Premium Listings */}
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
                      <button className="mt-auto w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-semibold py-2 rounded-lg hover:from-yellow-500 hover:to-yellow-600">
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

      {/* Top Forum Posts */}
      <div className="container mx-auto px-6 py-16">
        {/* Header with gradient text and decorative elements */}
        <div className="relative text-center mb-12">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 bg-yellow-100 rounded-full opacity-20"></div>
          </div>
          <h2 className="relative text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 to-yellow-800">
            Topluluk Tartışmaları
          </h2>
          <p className="relative text-gray-600 max-w-2xl mx-auto text-lg">
            Katıldığınız tartışmalar ve paylaşımlar ile topluluğumuzun bir
            parçası olun. En popüler gönderileri keşfedin ve fikirlerinizi
            paylaşın.
          </p>
        </div>

        {/* Posts grid with enhanced cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {topPosts.map((post) => (
            <div
              key={post.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
            >
              {/* Card header accent */}
              <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-1"></div>

              <div className="p-6">
                {/* Author section */}
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                    <span className="text-yellow-700 font-semibold">
                      {post.name.charAt(0)}
                    </span>
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold text-gray-800">
                      {post.name} {post.surname}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(post.created_at).toLocaleDateString("tr-TR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                {/* Post content */}
                <div className="mb-6">
                  <p className="text-gray-700 leading-relaxed line-clamp-3">
                    {post.content}
                  </p>
                </div>

                {/* Interaction buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex space-x-4">
                    <button className="flex items-center text-gray-500 hover:text-yellow-600 transition-colors">
                      <Heart size={18} className="mr-1" />
                      <span className="text-sm">{post.likes}</span>
                    </button>
                    <button className="flex items-center text-gray-500 hover:text-yellow-600 transition-colors">
                      <ThumbsDown size={18} className="mr-1" />
                      <span className="text-sm">{post.dislikes}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <Link
            to="/forumpage"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-full font-semibold hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            Forumu Görüntüle
            <svg
              className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Homepage;
