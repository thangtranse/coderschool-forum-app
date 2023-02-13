// React
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
// Material UI
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
// Hook
import useIsLoggedIn from "../hook/useIsLoggedIn.js";

export default function BasicLayout() {
  console.log("re-render BasicLayout");
  const isLoggedIn = useIsLoggedIn();

  if (isLoggedIn) {
    return <Navigate to="/news" />;
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ height: "100vh" }}>
          <Outlet />
        </Box>
      </Container>
    </React.Fragment>
  );
}
