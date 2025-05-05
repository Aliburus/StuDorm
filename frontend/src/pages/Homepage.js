import React from "react";
import { useEffect, useState } from "react";
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
  ThumbsUp,
} from "lucide-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { PremiumService } from "../services/PremiumService";

function Homepage() {
  const [premiumListings, setPremiumListings] = useState([]);
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
      title: "Find Dorms",
      description:
        "Discover affordable student housing options near your campus",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Match Roommates",
      description: "Connect with compatible roommates who share your interests",
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: "Internships & Jobs",
      description:
        "Access exclusive part-time jobs and internship opportunities",
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Student Forum",
      description: "Join discussions and get help from fellow students",
    },
  ];
  const placeholderImages = [
    "https://img.freepik.com/free-vector/internship-job-concept_23-2148737067.jpg",
    "https://img.freepik.com/free-vector/internship-job-concept-illustration_23-2148754785.jpg",
    "https://img.freepik.com/free-vector/internship-job-illustration_52683-51046.jpg?w=360",
  ];
  const topPosts = [
    {
      title: "Tips for Finding Affordable Housing Near Campus",
      author: "Sarah Chen",
      likes: 156,
      replies: 45,
      timeAgo: "2 days ago",
      preview:
        "I've compiled a list of strategies that helped me find budget-friendly accommodation...",
    },
    {
      title: "Must-Know Interview Tips for Tech Internships",
      author: "James Wilson",
      likes: 142,
      replies: 38,
      timeAgo: "1 day ago",
      preview:
        "After going through multiple interviews, here are the key things to prepare...",
    },
    {
      title: "Best Part-Time Jobs for CS Students",
      author: "Emily Rodriguez",
      likes: 134,
      replies: 52,
      timeAgo: "3 days ago",
      preview:
        "Here are some flexible job options that won't interfere with your studies...",
    },
    {
      title: "How to Balance Work and Study",
      author: "Michael Park",
      likes: 128,
      replies: 41,
      timeAgo: "4 days ago",
      preview:
        "My experience juggling a part-time job while maintaining good grades...",
    },
    {
      title: "Roommate Communication Guidelines",
      author: "Lisa Thompson",
      likes: 121,
      replies: 33,
      timeAgo: "2 days ago",
      preview:
        "Essential tips for maintaining a healthy relationship with your roommates...",
    },
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
                Your Student Life, Simplified
              </h1>
              <p className="text-xl mb-8">
                Find dorms, roommates, jobs, and connect with other students
              </p>
              <div className="grid grid-cols-2 gap-4">
                <button className="bg-white text-yellow-500 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center">
                  <Building2 className="w-5 h-5 mr-2" />
                  Browse Dorms
                </button>
                <button className="bg-white text-yellow-500 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center">
                  <Users className="w-5 h-5 mr-2" />
                  Find Roommates
                </button>
                <button className="bg-white text-yellow-500 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center">
                  <Briefcase className="w-5 h-5 mr-2" />
                  Internships
                </button>
                <button className="bg-white text-yellow-500 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Part-Time Jobs
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
            <h2 className="text-3xl font-semibold">Premium Listings</h2>
            <div className="flex items-center text-yellow-500">
              <Crown className="w-6 h-6 mr-2" />
              <span className="font-semibold">Featured by Premium Members</span>
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
                        View Details
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
            Join our active student community and participate in trending
            discussions
          </p>
        </div>

        <div className="space-y-6">
          {topPosts.map((post, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-xl font-semibold text-gray-800">
                    {post.title}
                  </h4>
                  <p className="text-sm text-gray-500">
                    Posted by {post.author} • {post.timeAgo}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-yellow-500">
                    <ThumbsUp className="w-5 h-5 mr-1" />
                    <span className="font-semibold">{post.likes}</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <MessageSquare className="w-5 h-5 mr-1" />
                    <span>{post.replies}</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 mb-4">{post.preview}</p>
              <button className="text-yellow-500 font-semibold hover:text-yellow-600">
                Read More →
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-8 py-3 rounded-full font-semibold hover:from-yellow-500 hover:to-yellow-600 transition-colors">
            Visit Forum
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Homepage;
