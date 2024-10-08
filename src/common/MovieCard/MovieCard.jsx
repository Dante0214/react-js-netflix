import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import "./MovieCard.style.css";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";
import { useNavigate } from "react-router-dom";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import StarRateIcon from "@mui/icons-material/StarRate";

const MovieCard = ({ movie }) => {
  const nav = useNavigate();
  const { data: genreData } = useMovieGenreQuery();

  const handleCardClick = () => {
    nav(`/movies/${movie.id}`);
  };

  const showGenre = (genreIdList) => {
    if (!genreData) return [];
    const genreNameList = genreIdList.map((id) => {
      const genreObj = genreData.find((genre) => genre.id === id);
      return genreObj.name;
    });
    return genreNameList;
  };

  return (
    <Box
      className="movie-card"
      onClick={handleCardClick}
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
            <Typography display="flex" alignItems="center" variant="body1">
              <StarRateIcon style={{ marginRight: 8 }} />
              {movie.vote_average}
            </Typography>

            <Typography display="flex" alignItems="center" variant="body1">
              <ThumbUpOffAltIcon style={{ marginRight: 8 }} />
              {Math.ceil(movie.popularity)}
            </Typography>
            <div>{movie.adult ? "청불" : ""}</div>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default MovieCard;
