import React, { useState, useEffect } from "react";
import data from "../data.json";

const LocationSelector = ({
  formData,
  handleChange,
  districts: districtsProp,
}) => {
  const [provinces, setProvinces] = useState([]);
  const [districtsState, setDistrictsState] = useState([]);
  const districts =
    districtsProp !== undefined ? districtsProp : districtsState;

  // İlleri (provinces) filtrele
  useEffect(() => {
    const uniqueProvinces = data.map((item) => item.text); // Verilerinizde "text" ile il bilgisine erişim sağlanıyor
    setProvinces(uniqueProvinces);
  }, []);

  // formData içinde province değeri varsa, ilçeleri otomatik yükle
  useEffect(() => {
    if (formData.province) {
      const selectedProvinceData = data.find(
        (item) => item.text === formData.province
      );
      if (selectedProvinceData) {
        setDistrictsState(
          selectedProvinceData.districts.map((district) => district.text)
        );
      }
    }
  }, [formData.province]);

  // İl (province) seçildiğinde ilçeleri filtrele
  const handleProvinceChange = (e) => {
    const selectedProvince = e.target.value;
    handleChange({ target: { name: "province", value: selectedProvince } });

    const selectedProvinceData = data.find(
      (item) => item.text === selectedProvince
    ); // İle ait veriyi buluyoruz
    if (selectedProvinceData) {
      setDistrictsState(
        selectedProvinceData.districts.map((district) => district.text)
      ); // İlçeleri set ediyoruz
    } else {
      setDistrictsState([]);
    }
  };

  const handleDistrictChange = (e) => {
    const selectedDistrict = e.target.value;
    handleChange({ target: { name: "district", value: selectedDistrict } });
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1 flex items-center">
          İl
        </label>
        <select
          name="province"
          value={formData.province}
          onChange={handleProvinceChange}
          className="w-full border border-gray-200 rounded-lg p-2 text-xs focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all hover:border-yellow-400"
        >
          <option value="">İl Seçin</option>
          {provinces.map((prov) => (
            <option key={prov} value={prov}>
              {prov}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1 flex items-center">
          İlçe
        </label>
        <select
          name="district"
          value={formData.district}
          onChange={handleDistrictChange}
          className="w-full border border-gray-200 rounded-lg p-2 text-xs focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all hover:border-yellow-400"
          disabled={!formData.province}
        >
          <option value="">İlçe Seçin</option>
          {districts.map((dist) => (
            <option key={dist} value={dist}>
              {dist}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default LocationSelector;
