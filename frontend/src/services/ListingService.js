import axios from "axios";

const BASE_URL = "http://localhost:5000/api";
const YURT_BASE_URL = `${BASE_URL}/yurt-ilanlar`;
const INTERN_BASE_URL = `${BASE_URL}/interns`;
const PARTTIME_BASE_URL = `${BASE_URL}/parttimeads`;

// Yurt ilanlarını alacak fonksiyon
export const getListings = async () => {
  try {
    const response = await axios.get(YURT_BASE_URL);
    return response.data; // API'den gelen veriyi döndür
  } catch (error) {
    console.error("Listing API error:", error);
    throw error;
  }
};

// Filtreli yurt ilanlarını almak için
export const getFilteredListings = async (filters) => {
  try {
    const response = await axios.get(YURT_BASE_URL, { params: filters });
    return response.data;
  } catch (error) {
    console.error("Filtered listings API error:", error);
    throw error;
  }
};

export const getYurtAdsByUserId = async (userId) => {
  try {
    const response = await axios.get(`${YURT_BASE_URL}/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("User Yurt Ads API error:", error);
    throw error;
  }
};

// Belirli bir kullanıcıya ait staj ilanlarını almak için
export const getInternsByUserId = async (userId) => {
  try {
    const response = await axios.get(`${INTERN_BASE_URL}/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("User Intern Ads API error:", error);
    throw error;
  }
};

// Belirli bir kullanıcıya ait part-time ilanları almak için
export const getPartTimeAdsByUserId = async (userId) => {
  try {
    const response = await axios.get(`${PARTTIME_BASE_URL}/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("User Part-Time Ads API error:", error);
    throw error;
  }
};
