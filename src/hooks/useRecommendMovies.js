import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchRecommendMovies = (movie_id) => {
  return api.get(`/movie/${movie_id}/recommendations`);
};
export const useRecommendMoviesQuery = (movie_id) => {
  return useQuery({
    queryKey: ["movie-recommend", movie_id],
    queryFn: () => fetchRecommendMovies(movie_id),
    select: (result) => result.data,
  });
};
