import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import { Outlet, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  useMediaQuery,
} from "@mui/material";

function AppLayout() {
  const [keyword, setKeyword] = useState("");
  const nav = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };
  const searchByKeyword = (e) => {
    e.preventDefault();
    nav(`movies?q=${keyword}`);
    setKeyword("");
  };

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
              sx={{ ml: 4, flexGrow: 1, display: isMobile ? "none" : "flex" }}
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

            <Box
              sx={{
                flexGrow: 0,
                display: "flex",
                alignItems: "center",
              }}
            >
              <form
                onSubmit={searchByKeyword}
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "flex-end",
                }}
              >
                <TextField
                  onSubmit={searchByKeyword}
                  value={keyword}
                  placeholder="검색"
                  size="small"
                  sx={{
                    width: "50%",
                    mr: 1,
                    background: "gray",
                    borderRadius: "4px",
                  }}
                  onChange={(e) => setKeyword(e.target.value)}
                />

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton type="submit" color="inherit" edge="end">
                    <SearchIcon />
                  </IconButton>
                </Box>
              </form>

              {isMobile && (
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="end"
                  onClick={handleDrawerToggle}
                >
                  <MenuIcon />
                </IconButton>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: "40vw",
          },
        }}
      >
        <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => nav("/")}>
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => nav("/movies")}>
                <ListItemText primary="Movies" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Outlet />
    </>
  );
}

export default AppLayout;
