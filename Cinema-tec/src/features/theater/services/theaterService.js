import apiClient from "../../../api/apiClient";

export const getAllTheaters = () => {
  return apiClient.get("/theater");
};
