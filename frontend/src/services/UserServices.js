// services/UserServices.js
import axios from "axios";

// Yetkilendirme ve kullanıcı API uç noktaları
const AUTH_URL = "http://localhost:5000/api/auth/";
const PROFILE_URL = "http://localhost:5000/api/user"; // /api/user/profile
const USER_URL = "http://localhost:5000/api/user"; // /api/user/:id

// İlan sahibinin bilgilerini çekme
export const getUserById = async (userId) => {
  try {
    const { data } = await axios.get(`${USER_URL}/${userId}`);
    return data;
  } catch (err) {
    console.warn(`Kullanıcı ${userId} bulunamadı, sahibi göstermeyeceğiz.`);
    return null;
  }
};

// Kayıt olma
export const register = async (name, surname, email, password) => {
  try {
    const { data } = await axios.post(`${AUTH_URL}register`, {
      name,
      surname,
      email,
      password,
    });
    return data;
  } catch (err) {
    if (err.response && err.response.data) {
      throw err;
    } else {
      throw new Error(
        "Kayıt işlemi sırasında bir hata oluştu. Lütfen daha sonra tekrar deneyin."
      );
    }
  }
};

// Giriş yapma
export const login = async (email, password) => {
  try {
    const { data } = await axios.post(`${AUTH_URL}login`, { email, password });
    return data;
  } catch (err) {
    if (err.response && err.response.data) {
      throw err;
    } else {
      throw new Error(
        "Giriş yapılırken bir hata oluştu. Lütfen daha sonra tekrar deneyin."
      );
    }
  }
};

// Çıkış yapma
export const logout = async () => {
  const { data } = await axios.post(`${AUTH_URL}logout`);
  return data;
};

// Profil bilgilerini alma
export const getUserInfo = async (token) => {
  try {
    const { data } = await axios.get(`${PROFILE_URL}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (err) {
    console.error(
      "Profil bilgisi alınırken hata:",
      err.response?.data || err.message
    );
    throw new Error("Kullanıcı bilgileri alınırken bir sorun oluştu.");
  }
};

// Profil güncelleme
export const updateUserProfile = async (formData, token) => {
  try {
    const { data } = await axios.put(`${PROFILE_URL}/profile`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (err) {
    console.error(
      "Profil güncellenirken hata:",
      err.response?.data || err.message
    );
    throw new Error("Profil güncellenirken bir hata oluştu.");
  }
};
