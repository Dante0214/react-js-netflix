import React, { useState } from "react";
import "./MovieDetail.style.css";
import { useParams } from "react-router-dom";
import { useMoiveDetailQuery } from "../../hooks/useMoiveDetail";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Modal,
  Typography,
} from "@mui/material";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";
import { useMovieReviewsQuery } from "../../hooks/useMovieReviews";
import RecommendMovies from "./components/RecommendMovies";
import MovieTrailer from "./components/MovieTrailer";

const MovieDetail = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { id } = useParams();

  const { data: reviews } = useMovieReviewsQuery(id);
  const { data: genreData } = useMovieGenreQuery();
  const { data, isLoading, isError, error } = useMoiveDetailQuery(id);

  const [showReview, setShowReview] = useState(false);
  const [expandedReviewId, setExpandedReviewId] = useState(null);

  const handleToggleExpand = (reviewId) => {
    setExpandedReviewId((prevId) => (prevId === reviewId ? null : reviewId));
  };

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
            sx={{
              borderRadius: 2,
              width: "100%",
              maxWidth: 300,
              objectFit: "cover",
              maxHeight: 450,
            }}
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

          <Typography variant="body1">인기도: {data.popularity}</Typography>
          <Divider sx={{ borderColor: "white", my: 3 }} />
          <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
            <Button
              sx={{ color: "white" }}
              variant="text"
              onClick={() => setShowReview((prev) => !prev)}
            >
              {showReview ? "리뷰 숨기기" : "리뷰 보기"}
            </Button>
            <Button
              sx={{ color: "white" }}
              variant="text"
              onClick={handleClickOpen}
            >
              예고편 보기
            </Button>
          </Box>
          {showReview && (
            <Box sx={{ maxHeight: 400, overflowY: "auto", mt: 2 }}>
              {reviews?.results.map((review) => (
                <Card key={review.id} sx={{ mb: 2 }}>
                  <CardContent>
                    <Typography gutterBottom>
                      {expandedReviewId === review.id
                        ? review.content
                        : review.content.slice(0, 200) +
                          (review.content.length > 200 ? "..." : "")}
                    </Typography>
                    {review.content.length > 200 && (
                      <Button onClick={() => handleToggleExpand(review.id)}>
                        {expandedReviewId === review.id ? "줄이기" : "더보기"}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}
          <Box sx={{ mb: 4 }}>
            <RecommendMovies id={id} />
          </Box>
        </Grid>
      </Grid>

      <MovieTrailer open={open} onClose={handleClose} id={id} />
    </Container>
  );
};

export default MovieDetail;
