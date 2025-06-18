import apiClient from "@/api/apiController";

export const getAllTickets = () => {
  return apiClient.get("/ticket");
};

export const getTicketById = (id) => {
  return apiClient.get(`/ticket/${id}`);
};

export const createTicket = (data) => {
  return apiClient.post("/ticket", data);
};

export const updateTicket = (id, data) => {
  return apiClient.patch(`/ticket/${id}`, data);
};

export const removeTicket = (id) => {
  return apiClient.delete(`/ticket/${id}`);
};
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
