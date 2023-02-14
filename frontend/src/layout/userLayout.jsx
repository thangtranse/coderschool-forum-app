// React
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
// Material
import CssBaseline from "@mui/material/CssBaseline";
// Component
import AppBarComponent from "../component/appBar";
import useIsLoggedIn from "../hook/useIsLoggedIn.js";

export default function UserLayout(props) {
  const isLoggedIn = useIsLoggedIn();
  if (!isLoggedIn && typeof isLoggedIn === 'boolean') {
    return <Navigate to="/login" />;
  }
  console.log("re-render UserLayout", isLoggedIn);
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBarComponent>
        <Outlet />
      </AppBarComponent>
    </React.Fragment>
  );
}
