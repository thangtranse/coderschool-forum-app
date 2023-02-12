// React
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
// Material UI
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
// Action
import { loginAction } from "../reducer/authen";
// Component
import { LOGIN_MUTATION } from "../apollo/query/user";
import LoginFormComponent from "../component/form/login.component";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [loginMutation, { loading }] = useMutation(LOGIN_MUTATION);

  const handleLogin = async ({ email, password }) => {
    try {
      const { data } = await loginMutation({
        variables: { input: { email, password } },
      });
      dispatch(
        loginAction({
          accessToken: data.login.access_token,
          refreshToken: data.login.refresh_token,
        })
      );
      navigate("/news");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ height: "100vh", paddingTop: "10vh" }}>
          <LoginFormComponent
            onLogin={handleLogin}
            isError={error}
            isLoading={loading}
          />
        </Box>
      </Container>
    </React.Fragment>
  );
}
