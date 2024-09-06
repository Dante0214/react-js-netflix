import React from "react";
import { useRecommendMoviesQuery } from "../../../hooks/useRecommendMovies";
import MovieCard from "../../../common/MovieCard/MovieCard";
import MovieSlider from "../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../constants/responsive";
import Loading from "../../../common/Loading";
import { Alert, Typography } from "@mui/material";

const RecommendMovies = ({ id }) => {
  const { data, isLoading, isError, error } = useRecommendMoviesQuery(id);
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
        title="추천 영화"
        movies={data.results}
        responsive={responsive}
      />
    </div>
  );
};

export default RecommendMovies;
