import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// Material
import LoadingButton from "@mui/lab/LoadingButton";
import { Grid, TextField, Typography } from "@mui/material";

function RegisterForm({ onRegister, isError, isLoading }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== rePassword) {
      alert("Password and re-password do not match");
      return;
    }
    onRegister({ email: email, password: password });
  };

  const handleRedirectLogin = () => {
    navigate("/login");
  };
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
          label="Mật khẩu"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          fullWidth
          margin="normal"
          required
          disabled={isLoading ? true : false}
          error={isError ? true : false}
        />
        <TextField
          label="Nhập lại mật khẩu"
          type="password"
          value={rePassword}
          onChange={(event) => setRePassword(event.target.value)}
          fullWidth
          margin="normal"
          required
          disabled={isLoading ? true : false}
          error={isError ? true : false}
        />
        <LoadingButton
          type="submit"
          variant="outlined"
          size="medium"
          color="primary"
          fullWidth={true}
          sx={{
            marginTop: 2,
          }}
          disabled={isLoading ? true : false}
          error={isError ? true : false}
        >
          Đăng ký
        </LoadingButton>
        <Typography
          variant="overline"
          display="block"
          gutterBottom
          align="right"
          onClick={() => handleRedirectLogin()}
          sx={[
            {
              "&:hover": {
                color: "#1976d2",
                cursor: "pointer",
              },
            },
          ]}
          disabled={isLoading ? true : false}
          error={isError ? true : false}
        >
          Tôi đã có tài khoản. Đăng nhập
        </Typography>
      </form>
    </Grid>
  );
}

export default RegisterForm;
