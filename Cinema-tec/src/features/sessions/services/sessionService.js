import apiClient from "../../../api/apiClient";

export const getAllSessions = () => {
  return apiClient.get("/session");
};
