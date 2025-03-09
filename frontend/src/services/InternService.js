import axios from "axios";

// API URL
const API_URL = "http://localhost:5000/api/interns";

// Get all interns
export const getInterns = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching interns", error);
    throw error;
  }
};

// Get an intern by ID
export const getInternById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching intern", error);
    throw error;
  }
};

// Create a new intern
export const createIntern = async (internData) => {
  try {
    const response = await axios.post(API_URL, internData);
    return response.data;
  } catch (error) {
    console.error("Error creating intern", error);
    throw error;
  }
};

// Update an intern
export const updateIntern = async (id, internData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, internData);
    return response.data;
  } catch (error) {
    console.error("Error updating intern", error);
    throw error;
  }
};

// Delete an intern
export const deleteIntern = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting intern", error);
    throw error;
  }
};
