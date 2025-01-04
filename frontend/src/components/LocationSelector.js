import React, { useState, useEffect } from "react";
import data from "../data.json";
const LocationSelector = ({ formData, handleChange }) => {
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [neighborhoods, setNeighborhoods] = useState([]);

  // İlleri filtrele
  useEffect(() => {
    const uniqueCities = Array.from(new Set(data.map((item) => item.il)));
    setCities(uniqueCities);
  }, []);

  // İl seçildiğinde ilçeleri filtrele
  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    handleChange({ target: { name: "city", value: selectedCity } });

    const filteredDistricts = data
      .filter((item) => item.il === selectedCity)
      .map((item) => item.ilce);
    setDistricts([...new Set(filteredDistricts)]);
    setNeighborhoods([]);
  };

  // İlçe seçildiğinde mahalleleri filtrele
  const handleDistrictChange = (e) => {
    const selectedDistrict = e.target.value;
    handleChange({ target: { name: "district", value: selectedDistrict } });

    const filteredNeighborhoods = data
      .filter((item) => item.ilce === selectedDistrict)
      .map((item) => item.mahalle_koy);
    setNeighborhoods([...new Set(filteredNeighborhoods)]);
  };

  return (
    <div className="grid grid-cols-1 gap-6">
      <div>
        <label className="block text-gray-600 mb-2">İl</label>
        <select
          name="city"
          value={formData.city}
          onChange={handleCityChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">İl Seçin</option>
          {cities.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {formData.city && (
        <div>
          <label className="block text-gray-600 mb-2">İlçe</label>
          <select
            name="district"
            value={formData.district}
            onChange={handleDistrictChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">İlçe Seçin</option>
            {districts.map((district, index) => (
              <option key={index} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>
      )}

      {formData.district && (
        <div>
          <label className="block text-gray-600 mb-2">Mahalle/Köy</label>
          <select
            name="neighborhood"
            value={formData.neighborhood}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Mahalle/Köy Seçin</option>
            {neighborhoods.map((neighborhood, index) => (
              <option key={index} value={neighborhood}>
                {neighborhood}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default LocationSelector;
