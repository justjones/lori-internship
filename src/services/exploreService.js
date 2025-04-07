import apiClient from "./apiClient";

const getExploreItems = async (filter = "") => {
  const url = filter
    ? `/explore?filter=${filter}`
    : "/explore";

  const response = await apiClient.get(url);
  return response.data;
};

export default {
  getExploreItems,
};
