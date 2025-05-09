import axios from "axios";

// API base URL'ini belirtin
const API_URL = "http://localhost:5000/api";
// Part-time ilan oluşturma
export const createPartTimeAdvert = async (advertData) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.post(
      `${API_URL}/parttimeads`, // ✅ doğru route bu
      advertData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating part-time advert:", error);
    throw new Error(
      error.response ? error.response.data.message : "Something went wrong!"
    );
  }
};
