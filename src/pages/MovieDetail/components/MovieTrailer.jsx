import React from "react";
import { useMovieTrailersQuery } from "../../../hooks/useMovieTrailers";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import YouTube from "react-youtube";

const MovieTrailer = ({ open, onClose, id }) => {
  const {
    data: trailers,
    isError,
    error,
    isLoading,
  } = useMovieTrailersQuery(id);
  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const opts = {
    height: "315",
    width: "560",
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>예고편</DialogTitle>
      <DialogContent dividers>
        <Box
          sx={{
            maxHeight: "60vh", // Max height of modal content
            overflowY: "auto", // Enable vertical scroll if content exceeds max height
          }}
        >
          {isLoading ? (
            <Typography>Loading...</Typography>
          ) : isError ? (
            <Typography color="error">Error: {error.message}</Typography>
          ) : trailers.length > 0 ? (
            trailers.map((trailer) => (
              <Box key={trailer.id} sx={{ marginBottom: 2 }}>
                <Typography variant="h6">{trailer.name}</Typography>
                <YouTube videoId={trailer.key} opts={opts} />
              </Box>
            ))
          ) : (
            <Typography>예고편이 없습니다.</Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          닫기
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MovieTrailer;
