// services/topSellersServices.js
import apiClient from "./apiClient";

const topSellersService = {
  getTopSellers: async () => {
    const response = await apiClient.get("/topSellers");
    return response;
  },
};

export default topSellersService;
