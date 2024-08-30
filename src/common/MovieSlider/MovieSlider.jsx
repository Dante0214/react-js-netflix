import React from "react";
import "./MovieSlider.style.css";
import { Typography } from "@mui/material";
import Carousel from "react-multi-carousel";
import MovieCard from "../MovieCard/MovieCard";
import "react-multi-carousel/lib/styles.css";

const MovieSlider = ({ title, movies, responsive }) => {
  return (
    <div>
      <Typography variant="h5">{title}</Typography>
      <Carousel
        showDots={true}
        infinite={true}
        // partialVisible={true}
        centerMode={true}
        itemClass="moive-slider"
        containerClass="carousel-container"
        responsive={responsive}
      >
        {movies.map((movie, index) => (
          <MovieCard movie={movie} key={index} />
        ))}
      </Carousel>
    </div>
  );
};

export default MovieSlider;
