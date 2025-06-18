import apiClient from "@/api/apiController";

export const getAllSessions = async () => {
  const { data } = await apiClient.get("/session");
  return data;
};

export const getSessionById = async (id) => {
  const { data } = await apiClient.get(`/session/${id}`);
  return data;
};

export const createSession = async (sessionData) => {
  const { data } = await apiClient.post("/session", sessionData);
  return data;
};

export const updateSession = async (id, sessionData) => {
  const { id: _ignoreId, createdAt, updatedAt, ...payload } = sessionData;
  const { data } = await apiClient.patch(`/session/${id}`, payload);
  return data;
};

export const deleteSession = async (id) => {
  const { data } = await apiClient.delete(`/session/${id}`);
  return data;
};

export const getAll = getAllSessions;
export const getById = getSessionById;
export const create = createSession;
export const update = updateSession;
export const remove = deleteSession;
