import React from "react";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import "./Banner.style.css";
import { Alert, Skeleton, Grid, Typography } from "@mui/material";

const Banner = () => {
  const { data, isError, isLoading, error } = usePopularMoviesQuery();

  if (isError) {
    return (
      <Alert severity="error">
        <Typography variant="h6">Error:</Typography>
        <Typography variant="body2">{error.message}</Typography>
      </Alert>
    );
  }

  return (
    <div
      className="banner"
      style={{
        backgroundImage: isLoading
          ? undefined
          : `url(https://themoviedb.org/t/p/w1066_and_h600_bestv2${data.results[0].poster_path})`,
        backgroundColor: isLoading ? "#e0e0e0" : undefined,
      }}
    >
      <Grid
        container
        alignItems="center"
        justifyContent="flex-start"
        sx={{ padding: { xs: "10px", sm: "20px" } }}
      >
        <Grid
          item
          xs={12}
          sm={8}
          md={6}
          sx={{
            textAlign: { xs: "center", sm: "left" },
            padding: { xs: "10px", sm: "20px" },
          }}
        >
          {isLoading ? (
            <>
              <Skeleton variant="text" width={300} height={50} />
              <Skeleton variant="rectangular" width="100%" height={150} />
            </>
          ) : (
            <>
              <Typography variant="h4" component="h1" sx={{ color: "white" }}>
                {data?.results[0].title}
              </Typography>
              <Typography variant="body1" component="p" sx={{ color: "white" }}>
                {data?.results[0].overview}
              </Typography>
            </>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Banner;
