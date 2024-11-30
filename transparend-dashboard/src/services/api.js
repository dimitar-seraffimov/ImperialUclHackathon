import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:5323";

export const addItem = async (status, sust_level, material) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/add_item`, {
      status,
      sust_level,
      material,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding item:", error);
    throw error;
  }
};

export const changeStatus = async (id, status) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/change_status`, {
      id,
      status,
    });
    return response.data;
  } catch (error) {
    console.error("Error changing status:", error);
    throw error;
  }
};

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/get_total_items_info`);
    return response.data;
  } catch (error) {
    console.error("Error fetching total items info:", error);
    throw error;
  }
};
export const getTotalItemsInfo = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/get_total_items_info`);
    return response.data;
  } catch (error) {
    console.error("Error fetching total items info:", error);
    throw error;
  }
};
