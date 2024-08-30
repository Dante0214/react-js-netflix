import { Badge, Box, Grid, Typography } from "@mui/material";
import React from "react";
import "./MovieCard.style.css";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";

const MovieCard = ({ movie }) => {
  const { data: genreData } = useMovieGenreQuery();
  console.log(genreData);

  const showGenre = (genreIdList) => {
    if (!genreData) return [];
    const genreNameList = genreIdList.map((id) => {
      const genreObj = genreData.find((genre) => genre.id === id);
      return genreObj.name;
    });
    return genreNameList;
  };
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
        <Grid container spacing={1} flexDirection="column">
          {showGenre(movie.genre_ids).map((id, index) => (
            <Grid item key={index} sx={{ ml: 1 }}>
              <Box sx={{ display: "flex" }}>
                <Typography
                  sx={{ borderRadius: "4px", background: "red", p: 0.5 }}
                  variant="caption"
                >
                  {id}
                </Typography>
              </Box>
            </Grid>
          ))}
          <Grid item sx={{ ml: 1 }}>
            <div>{movie.vote_average}</div>
            <div>{movie.popularity}</div>
            <div>{movie.adult ? "청불" : ""}</div>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default MovieCard;
