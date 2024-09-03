import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchMoiveDetail = (movie_id) => {
  return api.get(`movie/${movie_id}`);
};
export const useMoiveDetailQuery = (movie_id) => {
  return useQuery({
    queryKey: ["movie-genre", movie_id],
    queryFn: () => fetchMoiveDetail(movie_id),
    select: (result) => result.data,
  });
};
