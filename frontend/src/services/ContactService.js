import axios from "axios";

const API_URL = "http://localhost:5000/api/contact/message"; // Backend endpoint'i

export const sendContactMessage = async (messageData) => {
  try {
    console.log("Gönderilen Veriler:", messageData); // Verilerin doğru şekilde gönderildiğini kontrol edin.
    const response = await axios.post(API_URL, messageData);
    return response.data;
  } catch (error) {
    console.error("Mesaj gönderme hatası:", error); // Detaylı hata logu ekleyelim.
    throw error;
  }
};
