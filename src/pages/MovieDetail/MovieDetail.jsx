import React from "react";
import { useParams } from "react-router-dom";
import { useMoiveDetailQuery } from "../../hooks/useMoiveDetail";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";

const MovieDetail = () => {
  const { id } = useParams();

  const { data: genreData } = useMovieGenreQuery();
  const { data, isLoading, isError, error } = useMoiveDetailQuery(id);
  console.log(data);

  const showGenre = (genreIdList) => {
    if (!genreData) return [];
    const genreNameList = genreIdList.map((id) => {
      const genreObj = genreData.find((genre) => genre.id === id);
      return genreObj.name;
    });
    return genreNameList;
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  return (
    <Container>
      <Grid container mt={4}>
        <Grid
          item
          xs={12}
          md={4}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Box
            component="img"
            src={`https://themoviedb.org/t/p/w300_and_h450_bestv2${data.poster_path}`}
            alt={data.title}
            sx={{ borderRadius: 2, width: "100%", maxWidth: 300 }}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h3" gutterBottom>
            {data.title}
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            {showGenre(data.genres.map((genre) => genre.id)).map(
              (genre, index) => (
                <Grid item key={index} sx={{ ml: 1 }}>
                  <Box sx={{ display: "flex" }}>
                    <Typography
                      sx={{ borderRadius: "4px", background: "red", p: 0.5 }}
                      variant="caption"
                    >
                      {genre}
                    </Typography>
                  </Box>
                </Grid>
              )
            )}
          </Box>
          <Typography variant="body1" mt={2}>
            {data.overview}
          </Typography>
          <Typography variant="body1" mt={2}>
            예산: ${data.budget.toLocaleString()}
          </Typography>
          <Typography variant="body1">
            개봉일: {new Date(data.release_date).toLocaleDateString()}
          </Typography>
          <Typography variant="body1">{data.popularity}</Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MovieDetail;
