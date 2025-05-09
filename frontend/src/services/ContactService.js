import axios from "axios";

const BASE_URL = "http://localhost:5000/api/contact";

export const sendContactMessage = async (messageData) => {
  try {
    const response = await axios.post(`${BASE_URL}/message`, messageData);
    return response.data;
  } catch (error) {
    console.error("Mesaj gönderme hatası:", error);
    throw error;
  }
};

export const getUserMessages = async () => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await axios.get(`${BASE_URL}/messages/user`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Kullanıcı mesajları hatası:", error);
    throw error;
  }
};
