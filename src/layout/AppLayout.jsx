import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import { Outlet, useNavigate } from "react-router-dom";
import { TextField, useMediaQuery } from "@mui/material";

function AppLayout() {
  const nav = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <>
      <AppBar position="static" sx={{ background: "black" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <img
              onClick={() => nav("/")}
              src="https://images.ctfassets.net/4cd45et68cgf/4nBnsuPq03diC5eHXnQYx/d48a4664cdc48b6065b0be2d0c7bc388/Netflix-Logo.jpg"
              alt="Logo"
              style={{ marginRight: "auto", height: "50px", cursor: "pointer" }}
            />
            <Box
              sx={{ ml: 4, flexGrow: 1, display: { xs: "flex", md: "flex" } }}
            >
              <Button
                onClick={() => nav("/")}
                sx={{ my: 2, color: "inherit", display: "block" }}
              >
                Home
              </Button>
              <Button
                onClick={() => nav("/movies")}
                sx={{ my: 2, color: "inherit", display: "block" }}
              >
                Movies
              </Button>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <TextField
                placeholder="Search"
                size="small"
                sx={{
                  mr: 1,
                  background: "gray",
                  borderRadius: "4px",
                }}
              />

              {!isMobile && (
                <Button variant="outlined" startIcon={<SearchIcon />}>
                  Search
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
    </>
  );
}

export default AppLayout;
