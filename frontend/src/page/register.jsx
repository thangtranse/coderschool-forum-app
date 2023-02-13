// React
import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// Material UI
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
// Component
import { REGISTER_MUTATION } from "../apollo/query/user";
import RegisterFormComponent from "../component/form/register.component";

export default function LoginPage() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [createAccount, { loading }] = useMutation(REGISTER_MUTATION);

  const handleRegister = async ({ email, password }) => {
    try {
      const { data } = await createAccount({
        variables: { input: { email, password } },
      });
      navigate("/login", {
        replace: true,
        state: { email: data.createAccount.email },
      });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ height: "100vh", paddingTop: "10vh" }}>
          <RegisterFormComponent
            onRegister={handleRegister}
            isError={error}
            isLoading={loading}
          />
        </Box>
      </Container>
    </React.Fragment>
  );
}
