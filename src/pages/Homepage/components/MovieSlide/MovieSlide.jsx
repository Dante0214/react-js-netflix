import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MovieCard from "../MovieCard/MovieCard";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import { useTopRateMoviesQuery } from "../../../../hooks/useTopRateMovies";
import { useUpcomingMoviesQuery } from "../../../../hooks/useUpcomingMovies";
import "./MovieSlide.style.css";
import { Typography } from "@mui/material";
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const MovieSlide = ({ option }) => {
  const queries = {
    popular: usePopularMoviesQuery,
    toprate: useTopRateMoviesQuery,
    upcoming: useUpcomingMoviesQuery,
  };
  const titles = {
    popular: "인기 순위",
    toprate: "최고 평점 영화",
    upcoming: "개봉 예정 영화",
  };
  const { data, isLoading, isError, error } = queries[option]();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <div>
      <Typography variant="h5">{titles[option]}</Typography>
      <Carousel
        infinite={true}
        centerMode={true}
        itemClass="moive-slider"
        containerClass="carousel-container"
        responsive={responsive}
      >
        {data?.results.map((movie, index) => (
          <MovieCard movie={movie} key={index} />
        ))}
      </Carousel>
    </div>
  );
};

export default MovieSlide;
