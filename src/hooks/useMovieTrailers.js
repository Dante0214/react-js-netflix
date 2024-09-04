import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchMovieTrailers = (movie_id) => {
  return api.get(`movie/${movie_id}/videos`);
};
export const useMovieTrailersQuery = (movie_id) => {
  return useQuery({
    queryKey: ["movie-trailers", movie_id],
    queryFn: () => fetchMovieTrailers(movie_id),
    select: (result) =>
      result.data.results.filter((trailer) => trailer.type === "Trailer"),
  });
};
