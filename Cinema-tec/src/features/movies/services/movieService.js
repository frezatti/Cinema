import apiClient from "@/api/apiController";

export const getAllMovies = async () => {
  const { data } = await apiClient.get("/movies");
  return data;
};

export const getMovieById = async (id) => {
  const { data } = await apiClient.get(`/movies/${id}`);
  return data;
};

export const createMovie = async (movieData) => {
  const { data } = await apiClient.post("/movies", movieData);
  return data;
};

export const updateMovie = async (id, movieData) => {
  const { id: _ignoreId, createdAt, updatedAt, ...payload } = movieData;
  if (!payload.poster) delete payload.poster;
  const { data } = await apiClient.patch(`/movies/${id}`, payload);
  return data;
};

export const deleteMovie = async (id) => {
  const { data } = await apiClient.delete(`/movies/${id}`);
  return data;
};

export const getAll = getAllMovies;
export const getById = getMovieById;
export const create = createMovie;
export const update = updateMovie;
export const remove = deleteMovie;
