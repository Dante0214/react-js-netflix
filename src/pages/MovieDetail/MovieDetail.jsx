import React, { useState } from "react";
import "./MovieDetail.style.css";
import { useParams } from "react-router-dom";
import { useMoiveDetailQuery } from "../../hooks/useMoiveDetail";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";
import { useMovieReviewsQuery } from "../../hooks/useMovieReviews";
import RecommendMovies from "./components/RecommendMovies";
import MovieTrailer from "./components/MovieTrailer";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
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

  if (isError) {
    return (
      <Alert severity="error">
        <Typography variant="h6">Error:</Typography>
        <Typography variant="body2">{error.message}</Typography>
      </Alert>
    );
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
          {isLoading ? (
            <Skeleton
              variant="rectangular"
              width={300}
              height={450}
              sx={{ bgcolor: "grey.900" }}
            />
          ) : (
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
          )}
        </Grid>
        <Grid item xs={12} md={8}>
          {isLoading ? (
            <Skeleton
              variant="text"
              width={300}
              height={50}
              sx={{ bgcolor: "grey.900" }}
            />
          ) : (
            <Typography variant="h3" gutterBottom>
              {data.title}
            </Typography>
          )}

          {isLoading ? (
            <Skeleton
              variant="text"
              width="100%"
              height={30}
              sx={{ bgcolor: "grey.900" }}
            />
          ) : (
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              {showGenre(data.genres.map((genre) => genre.id)).map(
                (genre, index) => (
                  <Grid item key={index} sx={{ ml: 1 }}>
                    <Box sx={{ display: "flex" }}>
                      <Typography
                        sx={{
                          borderRadius: "4px",
                          background: "red",
                          p: 0.5,
                        }}
                        variant="caption"
                      >
                        {genre}
                      </Typography>
                    </Box>
                  </Grid>
                )
              )}
            </Box>
          )}

          {isLoading ? (
            <Skeleton
              variant="text"
              width="100%"
              height={200}
              sx={{ bgcolor: "grey.900" }}
            />
          ) : (
            <>
              <Typography
                variant="body1"
                mt={2}
                display="flex"
                alignItems="center"
              >
                {data.overview}
              </Typography>
              <Typography
                variant="body1"
                mt={2}
                display="flex"
                alignItems="center"
              >
                <AttachMoneyIcon style={{ marginRight: 8 }} />
                {data.budget.toLocaleString()}
              </Typography>
              <Typography variant="body1" display="flex" alignItems="center">
                <CalendarMonthIcon style={{ marginRight: 8 }} />

                {new Date(data.release_date).toLocaleDateString()}
              </Typography>
              <Typography display="flex" alignItems="center" variant="body1">
                <ThumbUpOffAltIcon style={{ marginRight: 8 }} />
                {Math.ceil(data.popularity)}
              </Typography>
            </>
          )}

          <Divider sx={{ borderColor: "white", my: 3 }} />

          <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
            {isLoading ? (
              <>
                <Skeleton
                  variant="rectangular"
                  width={100}
                  height={36}
                  sx={{ mr: 2, bgcolor: "grey.900" }}
                />
                <Skeleton
                  variant="rectangular"
                  width={100}
                  height={36}
                  sx={{ bgcolor: "grey.900" }}
                />
              </>
            ) : (
              <>
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
              </>
            )}
          </Box>

          {showReview && (
            <Box sx={{ maxHeight: 400, overflowY: "auto", mt: 2 }}>
              {isLoading
                ? [1, 2, 3].map((item) => (
                    <Skeleton
                      key={item}
                      variant="rectangular"
                      height={100}
                      sx={{ mb: 2, bgcolor: "grey.900" }}
                    />
                  ))
                : reviews?.results.map((review) => (
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
                            {expandedReviewId === review.id
                              ? "줄이기"
                              : "더보기"}
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
