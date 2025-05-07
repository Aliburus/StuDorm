import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPartTimeJobById } from "../services/PartTimeService"; // Dosya yapısına göre yolu ayarlayın
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
  MapPin,
  Clock,
  DollarSign,
  UserCheck,
  Tag,
  FileText,
} from "lucide-react";

function PartTimeJobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const jobData = await getPartTimeJobById(id);
        setJob(jobData);
      } catch (error) {
        console.error("İş ilanı detayları alınırken bir hata oluştu:", error);
      }
    };

    fetchJobDetails();
  }, [id]);

  if (!job) return <div>Yükleniyor...</div>;

  // 'requirements' bir dizi olduğundan emin olalım, sonrasında .map kullanabiliriz
  const requirementsList = job.requirements ? job.requirements.split(",") : [];

  return (
    <div>
      <Navbar />

      <div className=" mx-auto min-h-[calc(100vh-72px)] bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg justify-center ">
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-white">{job.title}</h1>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              <Tag className="w-4 h-4 mr-1 text-yellow-800" />
              {job.category}
            </span>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h2 className="text-xl font-semibold mb-3 text-gray-800 border-b pb-2">
                İş Detayları
              </h2>

              <div className="space-y-3">
                <div className="flex items-start">
                  <Clock className="w-5 h-5 text-yellow-500 mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Süre</p>
                    <p className="text-gray-700">{job.duration}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-yellow-500 mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Konum</p>
                    <p className="text-gray-700">
                      {job.province} - {job.district}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <UserCheck className="w-5 h-5 text-yellow-500 mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      İletişim
                    </p>
                    <p className="text-gray-700">{job.contact}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <DollarSign className="w-5 h-5 text-yellow-500 mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Ücret</p>
                    <p className="text-gray-700">{job.price}₺</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-gray-800 border-b pb-2">
                Gereksinimler
              </h2>
              <div className="flex items-start">
                <FileText className="w-5 h-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Nitelikler
                  </p>
                  <ul className="text-gray-700 space-y-1 mt-1">
                    {requirementsList.map((req, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-yellow-500 mr-1">•</span>
                        {req.trim()}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3 text-gray-800 border-b pb-2">
                Açıklama
              </h2>
              <div className="flex items-start">
                <FileText className="w-5 h-5 text-yellow-500 mr-2 mt-1 flex-shrink-0" />
                <p className="text-gray-700 leading-relaxed">
                  {job.description}
                </p>
              </div>
            </div>
          </div>{" "}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default PartTimeJobDetails;
