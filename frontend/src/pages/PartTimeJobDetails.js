import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPartTimeJobById } from "../services/PartTimeService"; // Adjust the path based on your file structure
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { MapPin, Clock, DollarSign, UserCheck } from "lucide-react";

function PartTimeJobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const jobData = await getPartTimeJobById(id);
        setJob(jobData);
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };

    fetchJobDetails();
  }, [id]);

  if (!job) return <div>Loading...</div>;

  // Ensure 'requirements' is an array before using .map
  const requirementsList = job.requirements ? job.requirements.split(",") : [];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">
            {job.title}
          </h2>
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              İlan Detayları
            </h3>
            <p className="text-gray-600 leading-relaxed">{job.description}</p>
          </div>

          {/* Job Details */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-5 h-5" />
              <span>
                {job.province} - {job.district}
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-5 h-5" />
              <span>{job.duration}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <UserCheck className="w-5 h-5" />
              <span>{job.contact}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <DollarSign className="w-5 h-5" />
              <span>{job.price}₺</span>
            </div>
          </div>

          {/* Job Requirements */}
          <div className="bg-gray-50 rounded-lg p-6 mt-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Gereksinimler
            </h3>
            <ul className="list-disc list-inside text-gray-600">
              {requirementsList.map((requirement, index) => (
                <li key={index}>{requirement.trim()}</li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-50 rounded-lg p-6 mt-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              İletişim Bilgileri
            </h3>
            <div className="flex items-center gap-3 text-gray-600">
              <UserCheck className="w-5 h-5" />
              <span>{job.contact}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <MapPin className="w-5 h-5" />
              <span>
                {job.province} - {job.district}
              </span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default PartTimeJobDetails;
