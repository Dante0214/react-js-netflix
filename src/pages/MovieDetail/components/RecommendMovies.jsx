import React from "react";
import { useRecommendMoviesQuery } from "../../../hooks/useRecommendMovies";
import MovieCard from "../../../common/MovieCard/MovieCard";
import MovieSlider from "../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../constants/responsive";

const RecommendMovies = ({ id }) => {
  const { data, isLoading, isError, error } = useRecommendMoviesQuery(id);
  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <div>
      <MovieSlider
        title="추천 영화"
        movies={data.results}
        responsive={responsive}
      />
    </div>
  );
};

export default RecommendMovies;
