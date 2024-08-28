import React from "react";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import "./Banner.style.css";
import { Box, Typography } from "@mui/material";

const Banner = () => {
  const { data, isError, isLoading, error } = usePopularMoviesQuery();
  if (isLoading) {
    return <h1>loading</h1>;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }
  return (
    <div
      className="banner"
      style={{
        backgroundImage:
          "url(" +
          `https://themoviedb.org/t/p/w1066_and_h600_bestv2${data.results[0].poster_path}` +
          ")",
      }}
    >
      <Box
        width="36%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        height="100%"
        p="20px"
        zIndex="2"
      >
        <Typography variant="h4" component="h1" sx={{ color: "white" }}>
          {data?.results[0].title}
        </Typography>
        <Typography variant="body1" component="p" sx={{ color: "white" }}>
          {data?.results[0].overview}
        </Typography>
      </Box>
    </div>
  );
};

export default Banner;
