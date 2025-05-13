import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

const YURT_BASE_URL = `${BASE_URL}/yurt-ilanlar`;
const INTERN_BASE_URL = `${BASE_URL}/interns`;
const PARTTIME_BASE_URL = `${BASE_URL}/parttimeads`;

// --------------------- Yurt İlanları ---------------------

export const getYurtListings = async () => {
  try {
    const response = await axios.get(YURT_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Yurt listings API error:", error);
    throw error;
  }
};

export const getFilteredYurtListings = async (filters) => {
  try {
    const response = await axios.get(YURT_BASE_URL, { params: filters });
    return response.data;
  } catch (error) {
    console.error("Filtered Yurt listings API error:", error);
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

export const getYurtAdById = async (id) =>
  (await axios.get(`${BASE_URL}/yurt-ilanlar/${id}`)).data;
export const createYurtIlan = async (formData) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Kullanıcı yetkilendirmesi bulunamadı");

    const response = await axios.post(`${BASE_URL}/yurt-ilan`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (err) {
    console.error("createYurtIlan error:", err.response?.data || err.message);
    throw new Error("Failed to save ad.");
  }
};

// --------------------- Staj İlanları ---------------------

export const getInterns = async () => {
  try {
    const response = await axios.get(INTERN_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching interns", error);
    throw error;
  }
};

export const getInternById = async (id) =>
  (await axios.get(`${BASE_URL}/interns/${id}`)).data;

export const getInternsByUserId = async (userId) => {
  try {
    const response = await axios.get(`${INTERN_BASE_URL}/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("User Intern Ads API error:", error);
    throw error;
  }
};

export const createIntern = async (internData) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.post(INTERN_BASE_URL, internData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating intern", error);
    throw error;
  }
};

export const updateIntern = async (id, internData) => {
  try {
    const response = await axios.put(`${INTERN_BASE_URL}/${id}`, internData);
    return response.data;
  } catch (error) {
    console.error("Error updating intern", error);
    throw error;
  }
};

export const deleteIntern = async (id) => {
  try {
    const response = await axios.delete(`${INTERN_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting intern", error);
    throw error;
  }
};

// --------------------- Part-Time İlanları ---------------------

export const getPartTimeJobs = async () => {
  try {
    const response = await axios.get(PARTTIME_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Part-time jobs API error:", error);
    throw error;
  }
};

export const getPartTimeJobById = async (id) =>
  (await axios.get(`${BASE_URL}/parttimeads/${id}`)).data;

export const getPartTimeAdsByUserId = async (userId) => {
  try {
    const response = await axios.get(`${PARTTIME_BASE_URL}/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("User Part-Time Ads API error:", error);
    throw error;
  }
};

export const createPartTimeAdvert = async (advertData) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.post(PARTTIME_BASE_URL, advertData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating part-time advert:", error);
    throw new Error(
      error.response ? error.response.data.message : "Something went wrong!"
    );
  }
};
