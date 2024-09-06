import React from "react";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";

import { responsive } from "../../../../constants/responsive";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import Loading from "../../../../common/Loading";
import { Alert, Typography } from "@mui/material";

const PopularMovieSlide = () => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();

  if (isLoading) {
    return <Loading num={5} />;
  }

  if (isError) {
    return (
      <Alert severity="error">
        <Typography variant="h6">Error:</Typography>
        <Typography variant="body2">{error.message}</Typography>
      </Alert>
    );
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
