import apiClient from "@/api/apiController";

export const getAll = () => {
  return apiClient.get("/session");
};

export const getById = (id) => {
  return apiClient.get(`/session/${id}`);
};

export const create = (data) => {
  return apiClient.post("/session", data);
};

export const update = (id, data) => {
  return apiClient.patch(`/session/${id}`, data);
};

export const remove = (id) => {
  return apiClient.delete(`/session/${id}`);
};
