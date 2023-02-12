import React from "react";
// Material UI
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
// Component
import LoginFormComponent from "../component/form/login.component";

export default function LoginPage() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ height: "100vh" }}>
          <LoginFormComponent />
        </Box>
      </Container>
    </React.Fragment>
  );
}
