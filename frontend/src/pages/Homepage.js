import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  Building2,
  Users,
  Briefcase,
  MessageSquare,
  Crown,
  MapPin,
  DollarSign,
  Clock,
  Star,
  Heart,
  ThumbsDown,
} from "lucide-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { PremiumService } from "../services/PremiumService";
import { getTopForumPosts } from "../services/ForumService";

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
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 text-white mb-8 md:mb-0">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Senin Öğrenci Portalın , Senin İçin
              </h1>
              <p className="text-xl mb-8">
                Yurt bulma, iş fırsatları ve topluluk tartışmaları için tek
                durak noktası. Öğrenci hayatını kolaylaştırmak için buradayız.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <button className="bg-white text-yellow-500 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center">
                  <Building2 className="w-5 h-5 mr-2" />
                  Yurtlar
                </button>
                <button className="bg-white text-yellow-500 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center">
                  <Users className="w-5 h-5 mr-2" />
                  Oda Arkadaşları
                </button>
                <button className="bg-white text-yellow-500 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center">
                  <Briefcase className="w-5 h-5 mr-2" />
                  Staj İlanları
                </button>
                <button className="bg-white text-yellow-500 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Part-Time İşler
                </button>
              </div>
            </div>
            <div className="md:w-3/5 ml-6">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
                alt="Students studying"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

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
              const imageToShow =
                ad.photos && ad.photos.length > 0
                  ? ad.photos[0]
                  : placeholderImages[index % placeholderImages.length];

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
                            ? "Dormitory"
                            : ad.type === "parttime"
                            ? "Part-Time Job"
                            : "Internship"}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{ad.title}</h3>
                      <div className="flex items-center mb-2 text-gray-600">
                        <MapPin className="w-4 h-4 mr-1" /> {ad.location}
                      </div>
                      {ad.price && (
                        <div className="flex items-center mb-4 text-gray-600">
                          <DollarSign className="w-4 h-4 mr-1" /> {ad.price}
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
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold mb-4">
            Top Community Discussions
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Katıldığınız tartışmalar ve paylaşımlar ile topluluğumuzun bir
            parçası olun. En popüler gönderileri keşfedin ve fikirlerinizi
            paylaşın.
          </p>
        </div>

        <div className="space-y-6">
          {topPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex flex-col min-h-[250px] transform hover:-translate-y-1 border-l-4 border-yellow-500"
            >
              <div className="text-gray-600 text-sm mb-4 pb-3 border-b border-gray-100">
                <span className="font-medium text-yellow-600">
                  {post.name} {post.surname}
                </span>
                <span className="block mt-1 text-gray-400 text-xs">
                  {new Date(post.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>

              <div className="text-gray-800 font-medium text-lg flex-grow leading-relaxed">
                {post.content.slice(0, 100)}
              </div>

              <div className="flex justify-end items-center space-x-4 mt-6 pt-3 border-t border-gray-100">
                <div className="flex items-center text-yellow-500">
                  <Heart size={16} className="mr-1" />
                  <span className="text-sm">{post.likes}</span>
                </div>
                <div className="flex items-center text-gray-400 hover:text-gray-600 transition-colors">
                  <ThumbsDown size={16} className="mr-1" />
                  <span className="text-sm">{post.dislikes}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/forumpage"
            className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-8 py-3 rounded-full font-semibold hover:from-yellow-500 hover:to-yellow-600 transition-colors"
          >
            Forumu Görüntüle
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Homepage;
