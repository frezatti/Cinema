import apiClient from "@/api/apiController";

export const getAll = () => {
  return apiClient.get("/movies");
};

export const getAllMovies = () => {
  return apiClient.get("/movies");
};

export const getMovieById = (id) => {
  return apiClient.get(`/movies/${id}`);
};

export const create = (movieData) => {
  return apiClient.post("/movies", movieData);
};

export const createMovie = (movieData) => {
  return apiClient.post("/movies", movieData);
};

export const update = (id, movieData) => {
  const { id: _ignoreId, createdAt, updatedAt, ...payload } = movieData;
  if (!payload.poster) delete payload.poster;
  return apiClient.patch(`/movies/${id}`, payload);
};

export const updateMovie = (id, movieData) => {
  const { id: _ignoreId, createdAt, updatedAt, ...payload } = movieData;
  if (!payload.poster) delete payload.poster;
  return apiClient.patch(`/movies/${id}`, payload);
};

export const remove = (id) => {
  return apiClient.delete(`/movies/${id}`);
};

export const deleteMovie = (id) => {
  return apiClient.delete(`/movies/${id}`);
};
