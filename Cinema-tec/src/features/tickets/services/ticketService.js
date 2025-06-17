import apiClient from "@/api/apiController";

export const getAll = () => {
  return apiClient.get("/ticket");
};

export const getById = (id) => {
  return apiClient.get(`/ticket/${id}`);
};

export const create = (data) => {
  return apiClient.post("/ticket", data);
};

export const update = (id, data) => {
  return apiClient.patch(`/ticket/${id}`, data);
};

export const remove = (id) => {
  return apiClient.delete(`/ticket/${id}`);
};
