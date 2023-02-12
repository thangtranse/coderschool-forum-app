import React from "react";
import { createBrowserRouter } from "react-router-dom";
// Layout
import BasicLayout from "../layout/basicLayout";
import UserLayout from "../layout/userLayout";
// Page
import ErrorPage from "../page/error-page";
import LoginPage from "../page/login";
import NewsPage from "../page/news";
import ProfilePage from "../page/profile";
import RegisterPage from "../page/register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BasicLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: "/news",
    element: <UserLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <NewsPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
    ],
  },
]);

export default router;
