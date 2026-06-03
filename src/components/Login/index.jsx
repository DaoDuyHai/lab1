import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Alert,
} from "@mui/material";
import { Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

function Login({ onLoginSuccess }) {
  const [credentials, setCredentials] = useState({
    login_name: "",
    password: "",
  });

  const [loginMsg, setLoginMsg] = useState({ type: "", text: "" });

  // Xử lý Đăng nhập
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginMsg({ type: "", text: "" });

    try {
      const res = await fetchModel(
        "https://tjlhg9-8081.csb.app/api/auth/login",
        {
          method: "POST",
          body: credentials,
        }
      );
      localStorage.setItem("token", res.data.token);
      onLoginSuccess(res.data);
    } catch (err) {
      setLoginMsg({ type: "error", text: "Sai tên đăng nhập hoặc mật khẩu!" });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 4,
        minHeight: "70vh",
      }}
    >
      <Paper
        variant="outlined"
        sx={{ padding: 3, width: "100%", maxWidth: "400px" }}
      >
        <Typography variant="h5" sx={{ mb: 2 }}>
          Đăng nhập
        </Typography>

        {loginMsg.text && (
          <Alert severity={loginMsg.type} sx={{ mb: 2 }}>
            {loginMsg.text}
          </Alert>
        )}

        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="Login Name"
            variant="outlined"
            margin="normal"
            value={credentials.login_name}
            onChange={(e) =>
              setCredentials((prev) => ({
                ...prev,
                login_name: e.target.value,
              }))
            }
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={credentials.password}
            onChange={(e) =>
              setCredentials((prev) => ({ ...prev, password: e.target.value }))
            }
          />

          <Button fullWidth variant="contained" type="submit" sx={{ mt: 2 }}>
            Đăng nhập
          </Button>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button
              component={Link}
              to="/register"
              size="small"
              sx={{ textTransform: "none" }}
            >
              Chưa có tài khoản? Đăng ký ngay
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}

export default Login;
