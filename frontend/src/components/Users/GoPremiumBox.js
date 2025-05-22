import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GoPremiumBox = ({ user }) => {
  const [benefits, setBenefits] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBenefits = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/premium-benefits"
        );
        if (!response.data || response.data.length === 0) {
          setError("Premium bilgileri bulunamadı");
          setLoading(false);
          return;
        }
        setBenefits(response.data[0]);
        setLoading(false);
      } catch (err) {
        setError("Premium avantajları yüklenirken bir hata oluştu");
        setLoading(false);
      }
    };

    fetchBenefits();
  }, []);

  const handleUpgrade = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    navigate("/payment");
  };

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return null;
  if (!benefits) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">{benefits.title}</h2>
      <p className="text-gray-600 mb-4">{benefits.description}</p>

      <ul className="space-y-2 mb-6">
        {benefits.benefit_list.split(/\r?\n|\r/).map((benefit, index) => (
          <li key={index} className="flex items-center">
            <svg
              className="w-5 h-5 text-green-500 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            {benefit.trim()}
          </li>
        ))}
      </ul>

      <div className="text-center">
        <p className="text-3xl font-bold mb-4">₺{benefits.price}</p>
        <button
          onClick={handleUpgrade}
          className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
        >
          {benefits.button_text}
        </button>
      </div>
    </div>
  );
};

export default GoPremiumBox;
