import apiClient from "../../../api/apiController";

export const getAll = () => {
  return apiClient.get("/theater");
};

export const getById = (id) => {
  return apiClient.get(`/theater/${id}`);
};

export const create = (data) => {
  return apiClient.post("/theater", data);
};

export const update = (id, data) => {
  return apiClient.patch(`/theater/${id}`, data);
};

export const remove = (id) => {
  return apiClient.delete(`/theater/${id}`);
};
