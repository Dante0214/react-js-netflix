import React from "react";
import "./MovieSlider.style.css";
import { Box, Container, Typography } from "@mui/material";
import Carousel from "react-multi-carousel";
import MovieCard from "../MovieCard/MovieCard";
import "react-multi-carousel/lib/styles.css";

const MovieSlider = ({ title, movies, responsive }) => {
  return (
    <Container sx={{ mt: 10 }}>
      <Typography variant="h5" sx={{ mb: 0 }}>
        {title}
      </Typography>
      <Box sx={{ mt: -6 }}>
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
      </Box>
    </Container>
  );
};

export default MovieSlider;
