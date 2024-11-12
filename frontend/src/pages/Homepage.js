import React from "react";
import Slider from "react-slick";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Dorm1 from "../assets/Dorm1.jpeg";
import Dorm2 from "../assets/Dorm2.jpeg";
import Dorm3 from "../assets/Dorm3.jpeg";
import Dorm4 from "../assets/Dorm4.jpeg";

const Homepage = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const dormitories = [
    {
      img: Dorm1,
      title: "Exclusive Dormie",
      location: "Wall Street 12G",
      price: "$350 per month",
    },
    {
      img: Dorm2,
      title: "Luxury Stay",
      location: "Park Avenue 7A",
      price: "$450 per month",
    },
    {
      img: Dorm3,
      title: "Modern Dorm",
      location: "Broadway 5F",
      price: "$300 per month",
    },
    {
      img: Dorm4,
      title: "Cozy Corner",
      location: "Sunset Blvd 45",
      price: "$320 per month",
    },
    {
      img: Dorm1,
      title: "Urban Nest",
      location: "Main Street 22B",
      price: "$400 per month",
    },
    {
      img: Dorm2,
      title: "Comfort Haven",
      location: "Elm Street 9C",
      price: "$380 per month",
    },
    {
      img: Dorm3,
      title: "Student Paradise",
      location: "College Road 3D",
      price: "$370 per month",
    },
    {
      img: Dorm4,
      title: "Elite Residence",
      location: "High Street 11E",
      price: "$450 per month",
    },
  ];

  const testimonials = [
    {
      quote:
        '"This dormitory has been amazing. I love the location and the price is perfect for a student budget!"',
      name: "John Doe",
      dorm: "Urban Nest",
    },
    {
      quote:
        '"Great experience! The facilities are top-notch, and I feel safe and comfortable."',
      name: "Jane Smith",
      dorm: "Luxury Stay",
    },
    {
      quote:
        '"The staff is very helpful, and I’ve made lifelong friends here. Highly recommend!"',
      name: "Chris Johnson",
      dorm: "Modern Dorm",
    },
    {
      quote:
        '"Amazing living experience! The dorm is clean, the amenities are great, and the location is perfect!"',
      name: "Sarah Lee",
      dorm: "Exclusive Dormie",
    },
    {
      quote:
        '"I appreciate the quiet environment and the study spaces. This place is perfect for students!"',
      name: "Alex Turner",
      dorm: "Cozy Corner",
    },
    {
      quote:
        '"Living here has been a dream. The atmosphere is lively, and everything I need is within walking distance."',
      name: "Emily Davis",
      dorm: "Comfort Haven",
    },
    {
      quote:
        '"I can’t say enough about how much I love this dorm. It’s clean, affordable, and located in a great area!"',
      name: "Mark Wilson",
      dorm: "Student Paradise",
    },
    {
      quote:
        '"I’ve been living here for a year, and I wouldn’t want to be anywhere else. The community here is fantastic!"',
      name: "Olivia Harris",
      dorm: "Elite Residence",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <Header />
      <main className="flex-grow container mx-auto py-10 px-6">
        <h1 className="text-4xl font-semibold mb-8 text-center text-gray-800">
          Premium Dorm
        </h1>

        <section className="text-center mb-16 p-6 rounded-lg ">
          <Slider {...settings}>
            {dormitories.map((dorm, index) => (
              <div key={index} className="p-4">
                <div className="bg-white shadow-xl rounded-lg overflow-hidden transform transition duration-500 hover:scale-105">
                  <img
                    src={dorm.img}
                    alt={dorm.title}
                    className="w-full h-56 object-cover rounded-t-lg"
                  />
                  <div className="p-6">
                    <h4 className="text-2xl font-semibold text-gray-800">
                      {dorm.title}
                    </h4>
                    <p className="text-gray-600">{dorm.location}</p>
                    <p className="text-lg text-gray-800 font-semibold mb-4">
                      {dorm.price}
                    </p>
                    <button className="mt-4 px-8 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold rounded-full hover:from-yellow-500 hover:to-yellow-400">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto text-center ">
            <h2 className="text-4xl font-semibold mb-8 text-gray-800">
              What Our Users Say About Us
            </h2>
            <Slider {...settings}>
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-xl mb-6 h-60"
                >
                  <p className="text-gray-600 italic">{testimonial.quote}</p>
                  <h4 className="mt-4 font-semibold text-gray-800">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-600">
                    Resident at {testimonial.dorm}
                  </p>
                </div>
              ))}
            </Slider>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Homepage;
