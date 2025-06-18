import apiClient from "@/api/apiController";

export const getAllTickets = async () => {
  const { data } = await apiClient.get("/ticket");
  return data;
};

export const getTicketById = async (id) => {
  const { data } = await apiClient.get(`/ticket/${id}`);
  return data;
};

export const createTicket = async (ticketData) => {
  const { data } = await apiClient.post("/ticket", ticketData);
  return data;
};

export const updateTicket = async (id, ticketData) => {
  const { id: _ignoreId, createdAt, updatedAt, ...payload } = ticketData;
  const { data } = await apiClient.patch(`/ticket/${id}`, payload);
  return data;
};

export const deleteTicket = async (id) => {
  const { data } = await apiClient.delete(`/ticket/${id}`);
  return data;
};

export const getAll = getAllTickets;
export const getById = getTicketById;
export const create = createTicket;
export const update = updateTicket;
export const remove = deleteTicket;
