// React
import { ApolloProvider } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
// Component
import graphQLClient from "./apollo/client.apollo";
import reportWebVitals from "./reportWebVitals";
import router from "./route/router";
// Redux
import { Provider } from "react-redux";
import { persistor, store } from "./reducer/index";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store} persistor={persistor}>
    <ApolloProvider client={graphQLClient}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
