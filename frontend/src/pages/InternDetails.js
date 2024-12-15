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

function InternDetails() {
  const internshipDetail = {
    title: "İş İlanı - Stajyer",
    description:
      "Yeni mezun veya üniversite öğrencisi stajyer arayışındayız. İşletme, pazarlama, yazılım geliştirme ve diğer departmanlarda kariyerine yön vermek isteyen adaylar başvurabilir.",
    jobType: "Stajyer",
    salary: "Aylık Ücret: 2,500 TL",
    location: "İstanbul, Türkiye",
    workingHours: "Haftalık Çalışma Saati: 40 Saat",
    contact: {
      phone: "+90 555 987 6543",
      email: "intern@company.com",
      address: "İstanbul, Türkiye",
    },
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto p-6">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">
            {internshipDetail.title}
          </h1>
          <p className="text-lg text-gray-700 mt-4">
            {internshipDetail.description}
          </p>
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
                  Çalışma Türü: {internshipDetail.jobType}
                </span>
              </div>
              <div className="flex items-center space-x-3 mb-3">
                <FaMoneyBill className="text-yellow-500 text-xl" />
                <span className="text-lg text-gray-600">
                  {internshipDetail.salary}
                </span>
              </div>
              <div className="flex items-center space-x-3 mb-3">
                <MdAccessTime className="text-yellow-500 text-xl" />
                <span className="text-lg text-gray-600">
                  {internshipDetail.workingHours}
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
                  {internshipDetail.location}
                </span>
              </div>
              <div className="flex items-center space-x-3 mb-3">
                <FaPhone className="text-yellow-500 text-xl" />
                <span className="text-lg text-gray-600">
                  {internshipDetail.contact.phone}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-yellow-500 text-xl" />
                <span className="text-lg text-gray-600">
                  {internshipDetail.contact.email}
                </span>
              </div>
            </div>
          </div>
          <button className="bg-yellow-500 text-white px-4 py-2 rounded-md">
            Başvur
          </button>
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

export default InternDetails;
