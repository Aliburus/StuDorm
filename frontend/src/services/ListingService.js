import axios from "axios";

// Backend API URL'ini burada belirtin
const BASE_URL = "http://localhost:5000/api/yurt-ilanlar";

// Yurt ilanlarını alacak fonksiyon
export const getListings = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data; // API'den gelen veriyi döndür
  } catch (error) {
    console.error("Listing API error:", error);
    throw error;
  }
};

// Filtreli yurt ilanlarını almak için
export const getFilteredListings = async (filters) => {
  try {
    const response = await axios.get(BASE_URL, { params: filters });
    return response.data;
  } catch (error) {
    console.error("Filtered listings API error:", error);
    throw error;
  }
};
