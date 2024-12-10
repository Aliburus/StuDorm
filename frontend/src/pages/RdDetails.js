import React from "react";
import { useState } from "react";
import Dorm1 from "../assets/Dorm1.jpeg";
import Dorm2 from "../assets/Dorm2.jpeg";
import Dorm3 from "../assets/Dorm3.jpeg";
import Dorm4 from "../assets/Dorm4.jpeg";
import Dorm5 from "../assets/Dorm5.jpeg";
import Dorm6 from "../assets/Dorm6.jpeg";
import { GrPrevious, GrNext } from "react-icons/gr";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaWifi,
  FaShieldAlt,
  FaDumbbell,
  FaBook,
  FaCoffee,
  FaShuttleVan,
  FaSoap,
  FaUniversity,
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function RdDetails() {
  const detail = {
    title: "Kadıköy Yurdu - Yurt İlanı",
    description:
      "Kadıköy'ün merkezi bir konumunda, çeşitli üniversitelere yürüme mesafesinde bulunan geniş ve konforlu bir yurt. Yurdumuz, öğrencilerin rahat bir yaşam sürmesi için gerekli tüm imkanlarla donatılmıştır. Yurt içinde sunulan olanaklar, öğrencilerin yaşam kalitesini artıracak şekilde titizlikle seçilmiştir. Konforlu yataklar, yüksek hızlı internet ve 24 saat güvenlik hizmeti sunulmaktadır. Öğrencilerimize hem yurt içi hem de yurt dışı gezileri ile sosyal bir yaşam imkanı sağlanmaktadır. Yurt içi ve yurt dışı öğrencilere uygun fiyatlı seçenekler sunulmaktadır, böylece herkes ihtiyacına göre bir çözüm bulabilir.",
    price: "Yıllık Ücret: 12,000 TL",
    location: "Kadıköy, İstanbul",
    amenities: [
      {
        text: "24 Saat Güvenlik",
        icon: <FaShieldAlt />,
        detail:
          "Yurt binamızda, güvenliğiniz için 24 saat aktif güvenlik hizmeti sağlanmaktadır. Hem iç mekan hem de dış mekan güvenlik kameraları ile tüm alanlar denetlenmektedir.",
      },
      {
        text: "Wi-Fi Erişimi",
        icon: <FaWifi />,
        detail:
          "Yüksek hızda internet erişimi sunulmaktadır. Çalışmalarınızı ve sosyal ihtiyaçlarınızı kesintisiz bir şekilde karşılayabileceksiniz.",
      },
      {
        text: "Etüt Odası",
        icon: <FaUniversity />,
        detail:
          "Yüksek öğrenim gören öğrenciler için sessiz çalışma odaları mevcuttur. Bu odalar, derslerinizi ve projelerinizi rahatça yapabileceğiniz bir ortam sunar.",
      },
      {
        text: "Kahvaltı ve Akşam Yemeği",
        icon: <FaCoffee />,
        detail:
          "Yurdumuzda her gün kahvaltı ve akşam yemeği verilmektedir. Öğrencilerimize sağlıklı ve dengeli beslenme imkanı sunuyoruz.",
      },
      {
        text: "Spor Salonu",
        icon: <FaDumbbell />,
        detail:
          "Yurt binasında, öğrencilerimizin fiziksel sağlığını da göz önünde bulundurarak modern bir spor salonu bulunmaktadır.",
      },
      {
        text: "Kütüphane",
        icon: <FaBook />,
        detail:
          "Yurt içinde, derslerinize yardımcı olacak ve kişisel okuma alanlarında rahatça çalışabileceğiniz bir kütüphane bulunmaktadır.",
      },
      {
        text: "Çamaşır Yıkama İmkanı",
        icon: <FaSoap />,
        detail:
          "Çamaşırhane hizmetimiz ile öğrencilerimize günlük yaşamlarını kolaylaştıracak olanaklar sunulmaktadır. Çamaşır yıkama ve kurutma işlemleri için uygun fiyatlarla hizmet verilmektedir.",
      },
      {
        text: "Yurt İçi Geziler",
        icon: <FaShuttleVan />,
        detail:
          "Yurdumuz, öğrencilerine eğlenceli ve öğretici yurt içi geziler düzenlemektedir. Geziler, kültürel ve sosyal etkileşimi artırmaya yönelik organize edilmektedir.",
      },
    ],
    contact: {
      phone: "+90 555 123 4567",
      email: "kadikoyyurdu@example.com",
      address: "Kadıköy, İstanbul, Türkiye",
    },
    images: [Dorm1, Dorm2, Dorm3, Dorm4, Dorm5, Dorm6],
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48192.2595167864!2d29.021853353440306!3d40.981125666405916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cac790b17ba89d%3A0xd2d24ea0437a7ee2!2zS2FkxLFrw7Z5L8Swc3RhbmJ1bA!5e0!3m2!1sen!2str!4v1731510862321!5m2!1sen!2str",
  };
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    if (currentImageIndex < detail.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    } else {
      setCurrentImageIndex(0);
    }
  };

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    } else {
      setCurrentImageIndex(detail.images.length - 1);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="rd-details flex justify-center items-start bg-gray-100 overflow-auto min-h-screen">
        <div className="p-6 max-w-6xl w-full">
          {/* Yurt Görseli */}
          <div className="flex items-center justify-between mb-6">
            {/* Ana Resim */}
            <div className="relative w-[700px] h-80">
              <img
                src={detail.images[currentImageIndex]}
                alt={detail.title}
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
              {/* Oklar */}
              <button
                onClick={prevImage}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full shadow-lg transition-all duration-300 hover:bg-opacity-75 hover:scale-110 focus:outline-none"
              >
                <GrPrevious className="text-xl" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full shadow-lg transition-all duration-300 hover:bg-opacity-75 hover:scale-110 focus:outline-none"
              >
                <GrNext className="text-xl" />
              </button>
            </div>

            {/* Küçük Resimler */}
            <div className="flex space-x-4">
              {detail.images
                .slice(currentImageIndex + 1, currentImageIndex + 4)
                .map((image, index) => (
                  <div key={index} className="w-20 h-20">
                    <img
                      src={image}
                      alt={`Küçük Resim ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg cursor-pointer transition-transform transform hover:scale-105"
                      onClick={() =>
                        setCurrentImageIndex(currentImageIndex + index + 1)
                      }
                    />
                  </div>
                ))}
            </div>
          </div>

          {/* Başlık ve Kısa Açıklama */}
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            {detail.title}
          </h1>
          <p className="text-gray-700 text-lg mb-6 leading-relaxed">
            {detail.description}
          </p>

          {/* Ücret, Konum ve İletişim Bilgileri */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <p className="text-2xl font-semibold ">{detail.price}</p>
            <div className="mt-4 sm:mt-0 text-gray-600 text-sm">
              <FaMapMarkerAlt className="inline-block mr-1 text-yellow-500" />
              {detail.contact.address}
            </div>
          </div>

          {/* İmkanlar Listesi */}
          <h2 className="text-3xl font-semibold text-gray-900 mb-3">
            Yurt İmkanları
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {detail.amenities.map((amenity, index) => (
              <li
                key={index}
                className="flex flex-col items-start space-y-2 bg-yellow-50 border border-yellow-200 p-4 rounded-lg shadow hover:bg-yellow-100 transition"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-yellow-500 text-2xl">
                    {amenity.icon}
                  </span>
                  <span className="text-gray-800 font-medium">
                    {amenity.text}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">{amenity.detail}</p>
              </li>
            ))}
          </ul>

          {/* İletişim Bilgileri */}
          <h2 className="text-3xl font-semibold text-gray-900 mb-3">
            İletişim Bilgileri
          </h2>
          <div className="flex flex-col space-y-2 text-gray-800 mb-8">
            <div className="flex items-center space-x-2">
              <FaPhone className="text-yellow-500" />
              <span>{detail.contact.phone}</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaEnvelope className="text-yellow-500" />
              <span>{detail.contact.email}</span>
            </div>
          </div>

          {/* Harita Konumu */}
          <h2 className="text-3xl font-semibold text-gray-900 mb-3">Konum</h2>
          <div className="w-full h-64 rounded-lg overflow-hidden shadow-lg">
            <iframe
              src={detail.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Yurt Konumu"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default RdDetails;
