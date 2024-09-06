import React from "react";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { useUpcomingMoviesQuery } from "../../../../hooks/useUpcomingMovies";
import { responsive } from "../../../../constants/responsive";
import Loading from "../../../../common/Loading";
import { Alert, Typography } from "@mui/material";

const UpcomingMovieSlide = () => {
  const { data, isLoading, isError, error } = useUpcomingMoviesQuery();

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
        title="개봉 예정작"
        movies={data.results}
        responsive={responsive}
      />
    </div>
  );
};

export default UpcomingMovieSlide;
