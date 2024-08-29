import React from "react";
import Banner from "./components/Banner/Banner";
import MovieSlide from "./components/MovieSlide/MovieSlide";
//베너 =>유명영화 1위
//유명영화
//평점영화
//나올영화
const Homepage = () => {
  return (
    <div>
      <Banner />
      <MovieSlide option="popular" />
      <MovieSlide option="toprate" />
      <MovieSlide option="upcoming" />
    </div>
  );
};

export default Homepage;
