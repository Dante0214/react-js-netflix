import React from "react";
import Banner from "./components/Banner/Banner";
import PopularMovieSlide from "./components/PopularMovieSlide/PopularMovieSlide";
import TopRateMovieSlide from "./components/TopRateMovieSlide/TopRateMovieSlide";
import UpcomingMovieSlide from "./components/UpcomingMovieSlide/UpcomingMovieSlide";
//베너 =>유명영화 1위
//유명영화
//평점영화
//나올영화
const Homepage = () => {
  return (
    <div>
      <Banner />
      <PopularMovieSlide />
      <TopRateMovieSlide />
      <UpcomingMovieSlide />
    </div>
  );
};

export default Homepage;
