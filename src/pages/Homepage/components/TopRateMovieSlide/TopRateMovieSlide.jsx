import React from "react";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { useTopRateMoviesQuery } from "../../../../hooks/useTopRateMovies";
import { responsive } from "../../../../constants/responsive";

const TopRateMovieSlide = () => {
  const { data, isLoading, isError, error } = useTopRateMoviesQuery();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <div>
      <MovieSlider
        title="평점 순"
        movies={data.results}
        responsive={responsive}
      />
    </div>
  );
};

export default TopRateMovieSlide;
