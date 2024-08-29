import { Badge, Box, Grid } from "@mui/material";
import React from "react";

import genreMap from "../../../../genres.json";
import "./MovieCard.style.css";
const MovieCard = ({ movie }) => {
  return (
    <div
      className="movie-card"
      style={{
        backgroundImage:
          "url(" +
          `https://themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}` +
          ")",
      }}
    >
      <Box alignItems="center" gap={2} className="overlay">
        <h1>{movie.title}</h1>
        <Grid
          container
          spacing={1}
          flexDirection="column"
          justifyContent="space-around"
        >
          {movie.genre_ids.map((id, index) => (
            <Grid item key={index}>
              <Badge sx={{ pl: 4 }} badgeContent={genreMap[id]} color="error" />
            </Grid>
          ))}
        </Grid>
        <div>{movie.vote_average}</div>
        <div>{movie.popularity}</div>
        <div>{movie.adult ? "청불" : ""}</div>
      </Box>
      <div></div>
    </div>
  );
};

export default MovieCard;
