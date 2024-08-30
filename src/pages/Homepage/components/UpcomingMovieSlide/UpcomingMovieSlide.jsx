import React from "react";
import MovieSlider from "../../../../common/Movieslider/MovieSlider";
import { useUpcomingMoviesQuery } from "../../../../hooks/useUpcomingMovies";
import { responsive } from "../../../../constants/responsive";

const UpcomingMovieSlide = () => {
  const { data, isLoading, isError, error } = useUpcomingMoviesQuery();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <div>
      <MovieSlider
        title="개봉 예정작"
        movies={data.results}
        responsive={responsive}
      />
    </div>
  );
};

export default UpcomingMovieSlide;
