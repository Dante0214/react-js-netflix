import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchSearchMovie = ({ keyword, page, selectedGenre }) => {
  if (keyword) {
    return api.get(`/search/movie?query=${keyword}&page=${page}`);
  } else if (selectedGenre) {
    return api.get(`/discover/movie?with_genres=${selectedGenre}&page=${page}`);
  }
  return api.get(`/movie/popular?page=${page}`);
};

export const useSearchMovieQuery = ({ keyword, page, selectedGenre }) => {
  return useQuery({
    queryKey: ["movie-search", keyword, page, selectedGenre],
    queryFn: () => fetchSearchMovie({ keyword, page, selectedGenre }),
    select: (result) => result.data,
  });
};
