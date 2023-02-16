import React from "react";
import { createBrowserRouter } from "react-router-dom";
// Layout
import BasicLayout from "../layout/basicLayout";
import UserLayout from "../layout/userLayout";
// Page
import ErrorPage from "../page/error-page";
import MyFeedPage from "../page/my-feed";
import FeedPage from "../page/feed";
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
      },
      {
        path: "/register",
        element: <RegisterPage />,
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
        path: "my-feeds",
        element: <MyFeedPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      // {
      //   path: ":id",
      //   element: <FeedPage />,
      // },
    ],
  },
]);

export default router;
