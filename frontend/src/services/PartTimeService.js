import axios from "axios";

const API_URL = "http://localhost:5000/api/parttimeads";

export const getPartTimeJobs = async () => {
  try {
    const response = await axios.get(API_URL);

    return response.data;
  } catch (error) {
    console.error("Part-time ilanlar çekilirken hata oluştu:", error);
    return [];
  }
};

export const getPartTimeJobById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`İlan (${id}) getirilemedi:`, error);
    return null;
  }
};
