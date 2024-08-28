import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const nav = useNavigate();
  const handleGoBack = () => {
    nav("/");
  };
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <Box>
        <Typography variant="h1" component="h1" gutterBottom>
          404
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          페이지를 찾을 수 없습니다.
        </Typography>
        <Typography variant="body1" paragraph>
          페이지가 존재하지 않거나, 사용할 수 없는 페이지입니다. 입력하신 주소가
          정확한지 다시 한 번 확인해주세요.
        </Typography>
        <Button variant="contained" color="primary" onClick={handleGoBack}>
          무비 홈
        </Button>
      </Box>
    </Container>
  );
};

export default NotFoundPage;
