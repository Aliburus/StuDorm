import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // useParams ile URL parametresini alıyoruz
import { getInternById } from "../services/InternService"; // internService dosyasını import ediyoruz
import Navbar from "../components/Navbar"; // Navbar bileşenini import ediyoruz
import Footer from "../components/Footer"; // Footer bileşenini import ediyoruz
import { MapPin, FileText, Tag, Mail, Clock, Award } from "lucide-react";

const InternDetails = () => {
  const { id } = useParams(); // URL parametresinden id alıyoruz
  const [internDetails, setInternDetails] = useState(null);

  useEffect(() => {
    getInternById(id)
      .then((data) => {
        if (data) {
          setInternDetails(data);
        } else {
          console.error("Intern not found");
        }
      })
      .catch((error) => {
        console.error("Error fetching intern details:", error);
      });
  }, [id]); // id değiştiğinde yeniden veri almayı sağlamak için useEffect kullandık

  if (!internDetails) return <p>Yükleniyor...</p>; // Eğer veriler gelmemişse loading mesajı göster

  const handleApply = () => {
    // Başvuru işlemleri burada yapılacak
    console.log("Başvuru yapıldı");
  };

  return (
    <div>
      <Navbar />
      <div className=" mx-auto min-h-[calc(100vh-72px)] bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg justify-center ">
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 px-6 py-4 ">
          <div className="flex justify-center items-center">
            <h1 className="text-3xl font-bold text-white ">
              {internDetails.title}
            </h1>
          </div>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Tag className="w-4 h-4 mr-1 text-yellow-800" />
            {internDetails.category}
          </span>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h2 className="text-xl font-semibold mb-3 text-gray-800 border-b pb-2">
                Internship Details
              </h2>

              <div className="space-y-3">
                <div className="flex items-start">
                  <Clock className="w-5 h-5 text-yellow-500 mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Duration
                    </p>
                    <p className="text-gray-700">{internDetails.duration}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-yellow-500 mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Location
                    </p>
                    <p className="text-gray-700">
                      {internDetails.province} - {internDetails.district}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-gray-800 border-b pb-2">
                Requirements
              </h2>
              <div className="flex items-start">
                <Award className="w-5 h-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Qualifications
                  </p>
                  <p className="text-gray-700">{internDetails.requirements}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3 text-gray-800 border-b pb-6">
              Description
            </h2>
            <div className="flex items-start">
              <FileText className="w-5 h-5 text-yellow-500 mr-2 mt-1 flex-shrink-0" />
              <p className="text-gray-700 leading-relaxed min-h-[100px]">
                {internDetails.description}
              </p>
            </div>
          </div>

          {/* Apply butonu: sarı ve hover efektli */}
          <div className="flex justify-center mt-8">
            <button
              onClick={handleApply}
              className="px-8 py-3 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50 transform transition-all duration-300 hover:scale-105"
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default InternDetails;
