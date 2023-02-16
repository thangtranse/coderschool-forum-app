// React
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// Material
import LoadingButton from "@mui/lab/LoadingButton";
import { Button, Grid, TextField, Typography } from "@mui/material";

function LoginForm({ proEmail = "", onLogin, isError, isLoading }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState(proEmail);
  const [password, setPassword] = useState("");
  const [isPasswordFieldFocus, setIsPasswordFieldFocus] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin({ email, password });
  };

  const handleDirect = (event) => {
    event.preventDefault();
    navigate("/register");
  };

  useEffect(() => {
    if (proEmail) {
      setIsPasswordFieldFocus(true);
    }
  }, [proEmail]);

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <form onSubmit={handleSubmit}>
        <Typography variant="h5" gutterBottom align="center">
          CoderSchool Forum
        </Typography>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          fullWidth
          margin="normal"
          required
          disabled={isLoading ? true : false}
          error={isError ? true : false}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          fullWidth
          margin="normal"
          required
          disabled={isLoading ? true : false}
          error={isError ? true : false}
          focused={isPasswordFieldFocus}
        />
        {isError}
        <LoadingButton
          type="submit"
          variant="outlined"
          size="medium"
          color="primary"
          fullWidth={true}
          sx={{
            marginTop: 2,
          }}
          loading={isLoading ? true : false}
          disabled={isLoading ? true : false}
        >
          Đăng nhập
        </LoadingButton>
        <Button
          onClick={handleDirect}
          variant="outlined"
          size="medium"
          color="primary"
          fullWidth={true}
          sx={{
            marginTop: 1,
          }}
          disabled={isLoading ? true : false}
        >
          Đăng ký
        </Button>
      </form>
    </Grid>
  );
}

export default LoginForm;
