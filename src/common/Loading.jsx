import { Grid, Skeleton } from "@mui/material";
import React from "react";

const Loading = ({ num }) => {
  return (
    <Grid container spacing={2} justifyContent="center">
      {[...Array(num)].map((_, index) => (
        <Grid item key={index}>
          <Skeleton
            variant="rectangular"
            width={210}
            height={118}
            sx={{ bgcolor: "grey.900" }}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Loading;
