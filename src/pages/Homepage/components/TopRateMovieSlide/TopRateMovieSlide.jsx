import React from "react";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { useTopRateMoviesQuery } from "../../../../hooks/useTopRateMovies";
import { responsive } from "../../../../constants/responsive";
import Loading from "../../../../common/Loading";
import { Alert, Typography } from "@mui/material";

const TopRateMovieSlide = () => {
  const { data, isLoading, isError, error } = useTopRateMoviesQuery();

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
        title="평점 순"
        movies={data.results}
        responsive={responsive}
      />
    </div>
  );
};

export default TopRateMovieSlide;
