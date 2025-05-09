import React, { useState, useEffect } from "react";
import data from "../data.json";

const LocationSelector = ({ formData, handleChange }) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [neighborhoods, setNeighborhoods] = useState([]);

  // İlleri (provinces) filtrele
  useEffect(() => {
    const uniqueProvinces = Array.from(new Set(data.map((item) => item.il)));
    setProvinces(uniqueProvinces);
  }, []);

  // İl (province) seçildiğinde ilçeleri filtrele
  const handleProvinceChange = (e) => {
    const selectedProvince = e.target.value;
    handleChange({ target: { name: "province", value: selectedProvince } });

    const filteredDistricts = data
      .filter((item) => item.il === selectedProvince)
      .map((item) => item.ilce);
    setDistricts([...new Set(filteredDistricts)]);
    setNeighborhoods([]);
  };

  // İlçe (district) seçildiğinde mahalleleri filtrele
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
          name="province"
          value={formData.province}
          onChange={handleProvinceChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">İl Seçin</option>
          {provinces.map((prov) => (
            <option key={prov} value={prov}>
              {prov}
            </option>
          ))}
        </select>
      </div>

      {formData.province && (
        <div>
          <label className="block text-gray-600 mb-2">İlçe</label>
          <select
            name="district"
            value={formData.district}
            onChange={handleDistrictChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">İlçe Seçin</option>
            {districts.map((dist) => (
              <option key={dist} value={dist}>
                {dist}
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
            {neighborhoods.map((nh) => (
              <option key={nh} value={nh}>
                {nh}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default LocationSelector;
