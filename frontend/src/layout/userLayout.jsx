// React
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
// Material
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
// Component
import AppBarComponent from "../component/appBar";
import useIsLoggedIn from "../hook/useIsLoggedIn.js";

export default function UserLayout(props) {
  const isLoggedIn = useIsLoggedIn();

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  console.log("re-render UserLayout");
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBarComponent>
          <Outlet />
      </AppBarComponent>
    </React.Fragment>
  );
}
