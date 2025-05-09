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
    if (response.status !== 200) {
      console.error("Intern not found", response.status);
      return null;
    }
    return response.data;
  } catch (error) {
    const errorMessage = error.response
      ? `API Error: ${error.response.data.message || error.response.statusText}`
      : `Request Error: ${error.message}`;
    console.error("Error fetching intern:", errorMessage);
    alert(errorMessage); // Show alert for debugging
    throw error;
  }
};

// Create a new intern
export const createIntern = async (internData) => {
  const token = sessionStorage.getItem("token"); // veya nerede tutuyorsan

  try {
    const response = await axios.post(
      "http://localhost:5000/api/interns",
      internData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ); // Assuming your backend is hosted on localhost:5000
    alert("Intern ad created successfully!");
  } catch (error) {
    console.error("Error creating intern", error);
    alert("There was an error while creating the intern ad.");
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
