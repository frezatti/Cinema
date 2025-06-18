import apiClient from "@/api/apiController";

export const getAllTheaters = async () => {
  const { data } = await apiClient.get("/theater");
  return data;
};

export const getTheaterById = async (id) => {
  const { data } = await apiClient.get(`/theater/${id}`);
  return data;
};

export const createTheater = async (theaterData) => {
  const { data } = await apiClient.post("/theater", theaterData);
  return data;
};

export const updateTheater = async (id, theaterData) => {
  const { id: _ignoreId, createdAt, updatedAt, ...payload } = theaterData;
  const { data } = await apiClient.patch(`/theater/${id}`, payload);
  return data;
};

export const deleteTheater = async (id) => {
  const { data } = await apiClient.delete(`/theater/${id}`);
  return data;
};

export const getAll = getAllTheaters;
export const getById = getTheaterById;
export const create = createTheater;
export const update = updateTheater;
export const remove = deleteTheater;
