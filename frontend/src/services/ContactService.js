import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";
const API_URL = `${BASE_URL}/api/contact`;

export const sendContactMessage = async (messageData) => {
  try {
    const response = await axios.post(`${API_URL}/message`, messageData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserMessages = async () => {
  try {
    const response = await axios.get(`${API_URL}/messages/user`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
