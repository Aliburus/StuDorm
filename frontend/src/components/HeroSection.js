import React, { useEffect, useState } from "react";
import { ArrowRight, BookOpen, Briefcase, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // İlanlar sayfasına yönlendirme fonksiyonu
  const handleExploreClick = () => {
    navigate("/find"); // Find All sayfasına yönlendir
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-yellow-600 to-yellow-500 py-20 md:py-28">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-yellow-300"></div>
        <div className="absolute top-1/4 right-0 h-64 w-64 rounded-full bg-orange-400"></div>
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-yellow-400"></div>
      </div>

      <div className="container relative mx-auto px-6">
        <div className="flex flex-col items-center justify-between lg:flex-row lg:items-start">
          {/* Text content */}
          <div
            className={`lg:w-1/2 text-white mb-12 lg:mb-0 transform transition-all duration-1000 ease-out ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Senin Öğrenci Portalın,
              <br />
              <span className="text-orange-900">Senin İçin</span>
            </h1>

            <p className="text-xl md:text-2xl mb-8 leading-relaxed text-yellow-50 max-w-xl">
              Yurt bulma, iş fırsatları ve topluluk tartışmaları için tek durak
              noktası. Öğrenci hayatını kolaylaştırmak için buradayız.
            </p>

            {/* Feature icons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-orange-900 bg-opacity-20 rounded-full">
                  <Home className="h-5 w-5 text-orange-900" />
                </div>
                <span className="text-yellow-50">Yurt Bul</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-orange-900 bg-opacity-20 rounded-full">
                  <Briefcase className="h-5 w-5 text-orange-900" />
                </div>
                <span className="text-yellow-50">İş Fırsatları</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-orange-900 bg-opacity-20 rounded-full">
                  <BookOpen className="h-5 w-5 text-orange-900" />
                </div>
                <span className="text-yellow-50">Topluluk</span>
              </div>
            </div>

            {/* Call to action */}
            <button
              onClick={handleExploreClick}
              className="group flex items-center space-x-2 bg-orange-900 hover:bg-orange-950 text-yellow-50 font-medium px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              <span>Şimdi Keşfet</span>
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

          {/* Image */}
          <div
            className={`lg:w-5/12 transition-all duration-1000 ease-out delay-300 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-orange-900 rounded-tl-3xl rounded-br-3xl opacity-30"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-yellow-300 rounded-tr-3xl rounded-bl-3xl opacity-30"></div>

              {/* Main image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl transform transition-transform duration-500 hover:scale-[1.02] hover:shadow-orange-500/30">
                <img
                  src="https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Öğrenciler kampüste"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-yellow-900/60 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
