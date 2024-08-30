import React from "react";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import MovieSlider from "../../../../common/Movieslider/MovieSlider";
import { responsive } from "../../../../constants/responsive";

const PopularMovieSlide = () => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <div>
      <MovieSlider
        title="인기 순위"
        movies={data.results}
        responsive={responsive}
      />
    </div>
  );
};

export default PopularMovieSlide;
