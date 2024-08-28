import { Route, Routes } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import Homepage from "./pages/Homepage/Homepage";
import MoviePage from "./pages/Movies/MoviePage";
import MovieDetail from "./pages/MovieDetail/MovieDetail";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import { CssBaseline } from "@mui/material";
import "./App.css";
//홈페이지 /
//영화전체 + 검색 /movies
//영화디테일 /movies/:id
function App() {
  return (
    <>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Homepage />} />
          <Route path="movies">
            <Route index element={<MoviePage />} />
            <Route path=":id" element={<MovieDetail />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
