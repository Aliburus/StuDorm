import axios from "axios";

const API_URL = "http://localhost:5000/api/auth/";

// Kullanıcı kaydı
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
    console.error("Register hatası:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || "Register işlemi başarısız."
    );
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Login hatası:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Login işlemi başarısız.");
  }
};

// Çıkış işlemi
export const logout = async () => {
  try {
    const response = await axios.post(`${API_URL}logout`);
    return response.data;
  } catch (error) {
    console.error("Logout hatası:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || "Logout işlemi başarısız."
    );
  }
};

// Kullanıcı bilgilerini al
export const getUserInfo = async (token) => {
  try {
    const response = await axios.get("http://localhost:5000/api/user/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "User info fetch error:",
      error.response?.data || error.message
    );
    throw new Error("Kullanıcı bilgileri alınırken bir hata oluştu.");
  }
};
