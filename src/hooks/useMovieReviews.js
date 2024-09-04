import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchMovieReviews = (movie_id) => {
  return api.get(`/movie/${movie_id}/reviews`);
};
export const useMovieReviewsQuery = (movie_id) => {
  return useQuery({
    queryKey: ["movie-reviews", movie_id],
    queryFn: () => fetchMovieReviews(movie_id),
    select: (result) => result.data,
  });
};
