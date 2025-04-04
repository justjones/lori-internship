import apiClient from './apiClient';

export const getNewItems = async () => {
  try {
    const response = await apiClient.get('/newItems'); // or '/author', or whatever your real endpoint is
    console.log("Fetched new items:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching new items:", error);
    throw error;
  }
};

// Optionally, other exports like:
export const getAuthorDetails = async (authorId) => {
    try {
      const response = await apiClient.get(`/authors?author=${authorId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching author details:", error);
      throw error;
    }
  };
  
