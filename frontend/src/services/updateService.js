import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const updateListing = async (type, id, data) => {
  try {
    let endpoint = "";
    switch (type) {
      case "yurt":
        endpoint = `${API_URL}/yurt-ilanlar/${id}`;
        break;
      case "intern":
        endpoint = `${API_URL}/interns/${id}`;
        break;
      case "parttime":
        endpoint = `${API_URL}/parttimeads/${id}`;
        break;
      default:
        throw new Error("Geçersiz ilan tipi");
    }

    const response = await axios.put(endpoint, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type":
          data instanceof FormData ? "multipart/form-data" : "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getListingById = async (type, id) => {
  try {
    let endpoint = "";
    switch (type) {
      case "yurt":
        endpoint = `${API_URL}/yurt-ilanlar/${id}`;
        break;
      case "intern":
        endpoint = `${API_URL}/interns/${id}`;
        break;
      case "parttime":
        endpoint = `${API_URL}/parttimeads/${id}`;
        break;
      default:
        throw new Error("Geçersiz ilan tipi");
    }

    const response = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
