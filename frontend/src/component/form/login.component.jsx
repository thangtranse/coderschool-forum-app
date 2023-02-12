// React
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// Material
import { Button, Grid, TextField, Typography } from "@mui/material";

function LoginForm() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);
    // Perform authentication here or send data to the server
  };

  const handleDirect = (event) => {
    event.preventDefault();
    navigate("/register");
  };

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <form onSubmit={handleSubmit}>
        <Typography variant="h5" gutterBottom>
          CoderSchool Discussion
        </Typography>
        <TextField
          label="Username"
          type="email"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <Button
          type="submit"
          variant="outlined"
          size="medium"
          color="primary"
          fullWidth={true}
        >
          Đăng nhập
        </Button>
        <Button
          onClick={handleDirect}
          variant="outlined"
          size="medium"
          color="primary"
          fullWidth={true}
        >
          Đăng ký
        </Button>
      </form>
    </Grid>
  );
}

export default LoginForm;
