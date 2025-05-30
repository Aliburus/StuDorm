// services/PremiumService.js
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";
const API_URL = `${BASE_URL}/api/homepage`;

const getPremiumListings = async (limit = 10) => {
  try {
    const res = await axios.get(`${API_URL}/premium-listings`, {
      params: { limit },
    });
    return res.data.data;
  } catch (error) {
    console.error("Error fetching premium listings:", error);
    throw new Error(
      "An error occurred while fetching premium listings. Please try again later."
    );
  }
};

export const PremiumService = {
  getPremiumListings,
};
