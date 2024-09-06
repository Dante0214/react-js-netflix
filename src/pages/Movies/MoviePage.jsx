import React, { useState } from "react";
import "./MoviePage.style.css";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import { useSearchParams } from "react-router-dom";
import {
  Alert,
  Button,
  Container,
  FormControl,
  Grid,
  MenuItem,
  Pagination,
  Select,
  Typography,
  useMediaQuery,
} from "@mui/material";
import MovieCard from "../../common/MovieCard/MovieCard";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";
import Loading from "../../common/Loading";

const MoviePage = () => {
  const isMobile = useMediaQuery("(max-width:600px)");

  const [selectedGenre, setSelectedGenre] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [query, setQuery] = useSearchParams();
  const keyword = query.get("q");
  const [page, setPage] = useState(1);
  const handlePageClick = (e, value) => {
    setPage(value);
  };
  const handleChange = (e) => {
    setSelectedGenre(e.target.value);
  };
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };
  const handleResetFilter = () => {
    setSelectedGenre("");
    setSortOption("");
    setPage(1);
  };

  const { data: genres } = useMovieGenreQuery();

  const { data, isLoading, isError, error } = useSearchMovieQuery({
    keyword,
    page,
    selectedGenre,
  });

  if (isLoading) {
    return <Loading num={10} />;
  }

  if (isError) {
    return (
      <Alert severity="error">
        <Typography variant="h6">Error:</Typography>
        <Typography variant="body2">{error.message}</Typography>
      </Alert>
    );
  }
  const filteredMovies = data?.results
    .filter((movie) =>
      selectedGenre ? movie.genre_ids.includes(Number(selectedGenre)) : true
    )
    .sort((a, b) => {
      switch (sortOption) {
        case "popularity_asc":
          return a.popularity - b.popularity;
        case "popularity_desc":
          return b.popularity - a.popularity;
        case "release_date_asc":
          return new Date(a.release_date) - new Date(b.release_date);
        case "release_date_desc":
          return new Date(b.release_date) - new Date(a.release_date);
        default:
          return 0;
      }
    });

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item md={4} xs={12}>
          <Grid container justifyContent={isMobile ? "center" : "flex-start"}>
            <Grid item>
              <Button
                fullWidth
                size="large"
                onClick={handleResetFilter}
                sx={{
                  background: "white",
                  color: "black",
                  "&:hover": {
                    backgroundColor: "white",
                  },
                }}
              >
                전체보기
              </Button>
              <FormControl sx={{ mt: 3 }} fullWidth variant="outlined">
                <Select
                  displayEmpty
                  value={selectedGenre}
                  onChange={handleChange}
                  label="Genre"
                  sx={{
                    color: "black",
                    backgroundColor: "white",
                    "& .MuiSelect-icon": {
                      color: "black",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "white",
                    },
                    "& .MuiMenuItem-root": {
                      color: "white",
                      backgroundColor: "rgba(0, 0, 0, 0.7)",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                      },
                    },
                  }}
                >
                  <MenuItem value="">장르 선택</MenuItem>
                  {genres?.map((genre) => (
                    <MenuItem key={genre.id} value={genre.id}>
                      {genre.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{ mt: 3 }} fullWidth variant="outlined">
                <Select
                  displayEmpty
                  value={sortOption}
                  onChange={handleSortChange}
                  label="Sort By"
                  sx={{
                    color: "black",
                    backgroundColor: "white",
                    "& .MuiSelect-icon": {
                      color: "black",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "white",
                    },
                    "& .MuiMenuItem-root": {
                      color: "white",
                      backgroundColor: "rgba(0, 0, 0, 0.7)",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                      },
                    },
                  }}
                >
                  <MenuItem value="">정렬 선택</MenuItem>
                  <MenuItem value="release_date_desc">최신순</MenuItem>
                  <MenuItem value="release_date_asc">오래된 순</MenuItem>
                  <MenuItem value="popularity_desc">인기도 ↑</MenuItem>
                  <MenuItem value="popularity_asc">인기도 ↓</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={8} xs={12}>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            {filteredMovies && filteredMovies.length > 0 ? (
              filteredMovies.map((movie, idx) => (
                <Grid item key={idx} sm={6} md={4}>
                  <MovieCard movie={movie} />
                </Grid>
              ))
            ) : (
              <Grid item>
                <Typography variant="h4">검색 결과가 없습니다.</Typography>
              </Grid>
            )}
          </Grid>
          <Pagination
            size="large"
            sx={{
              "& .MuiPaginationItem-root": {
                color: "white",
              },

              mt: 4,
              mb: 4,
              display: "flex",
              justifyContent: "center",
            }}
            color="secondary"
            count={data?.total_pages}
            page={page}
            onChange={handlePageClick}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default MoviePage;
