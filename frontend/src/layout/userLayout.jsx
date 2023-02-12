import React from "react";
import { Outlet } from "react-router-dom";
import useIsLoggedIn from "../hook/useIsLoggedIn.js";
import { Navigate } from "react-router-dom";

export default function UserLayout() {
  const isLoggedIn = useIsLoggedIn();

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Outlet />
    </>
  );
}
