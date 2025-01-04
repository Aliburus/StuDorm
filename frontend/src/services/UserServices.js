import axios from "axios";

const API_URL = "http://localhost:5000/api/auth/";
export const register = async (name, surname, email, password) => {
  try {
    const response = await axios.post(`${API_URL}register`, {
      name,
      surname,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
