import apiClient from './apiClient';



// Get all new items
export const getNewItems = async () => {
  try {
    const response = await apiClient.get('/newItems');
    console.log("Fetched new items:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching new items:", error);
    throw error;
  }
};

// Get details of a single item
export const getItemDetails = async (nftId) => {
  try {
    const response = await apiClient.get(`/newItems=${nftId}`);
    console.log("Fetched item details:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching item details:", error);
    throw error;
  }
};
