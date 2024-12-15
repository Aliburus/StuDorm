import React from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaMoneyBill,
} from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function PartTimeDetails() {
  const jobDetail = {
    title: "Kadıköy Yurdu - Part Time İş İlanı",
    description:
      "Kadıköy'deki yurdumuzda, öğrencilere uygun part-time iş fırsatları sunuyoruz. Çalışanlarımız için esnek çalışma saatleri ve cazip maaş avantajları sağlıyoruz. Yurt içi ve yurt dışı geziler düzenliyoruz ve çalışanlarımıza sosyal etkinlikler de sunuyoruz.",
    jobType: "Part-Time",
    salary: "Aylık Ücret: 4,500 TL",
    location: "Kadıköy, İstanbul",
    workingHours: "Haftalık Çalışma Saati: 20 Saat",
    contact: {
      phone: "+90 555 123 4567",
      email: "kadikoyyurdu@example.com",
      address: "Kadıköy, İstanbul, Türkiye",
    },
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto p-6">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">
            {jobDetail.title}
          </h1>
          <p className="text-lg text-gray-700 mt-4">{jobDetail.description}</p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-8 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                İş Bilgileri
              </h2>
              <div className="flex items-center space-x-3 mb-3">
                <MdAccessTime className="text-yellow-500 text-xl" />
                <span className="text-lg text-gray-600">
                  Çalışma Türü: {jobDetail.jobType}
                </span>
              </div>
              <div className="flex items-center space-x-3 mb-3">
                <FaMoneyBill className="text-yellow-500 text-xl" />
                <span className="text-lg text-gray-600">
                  {jobDetail.salary}
                </span>
              </div>
              <div className="flex items-center space-x-3 mb-3">
                <MdAccessTime className="text-yellow-500 text-xl" />
                <span className="text-lg text-gray-600">
                  {jobDetail.workingHours}
                </span>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                İletişim Bilgileri
              </h2>
              <div className="flex items-center space-x-3 mb-3">
                <FaMapMarkerAlt className="text-yellow-500 text-xl" />
                <span className="text-lg text-gray-600">
                  {jobDetail.location}
                </span>
              </div>
              <div className="flex items-center space-x-3 mb-3">
                <FaPhone className="text-yellow-500 text-xl" />
                <span className="text-lg text-gray-600">
                  {jobDetail.contact.phone}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-yellow-500 text-xl" />
                <span className="text-lg text-gray-600">
                  {jobDetail.contact.email}
                </span>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-semibold text-gray-900 mb-6">Konum</h2>
        <div className="w-full h-64 rounded-lg overflow-hidden shadow-lg mb-10">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48192.2595167864!2d29.021853353440306!3d40.981125666405916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cac790b17ba89d%3A0xd2d24ea0437a7ee2!2zS2FkxLFrw7Z5L8Swc3RhbmJ1bA!5e0!3m2!1sen!2str!4v1731510862321!5m2!1sen!2str"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Konum"
          ></iframe>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PartTimeDetails;
