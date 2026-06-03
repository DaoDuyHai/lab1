import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  Grid,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

const Register = () => {
  const [regData, setRegData] = useState({
    login_name: "",
    password: "",
    confirm_password: "",
    first_name: "",
    last_name: "",
    location: "",
    description: "",
    occupation: "",
  });

  const [regMsg, setRegMsg] = useState({ type: "", text: "" });

  const handleRegisterChange = (field, value) => {
    setRegData((prev) => ({ ...prev, [field]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setRegMsg({ type: "", text: "" });

    if (regData.password !== regData.confirm_password) {
      setRegMsg({ type: "error", text: "Mật khẩu xác nhận không khớp!" });
      return;
    }

    try {
      await fetchModel("https://tjlhg9-8081.csb.app/api/auth/user", {
        method: "POST",
        body: regData,
      });

      setRegMsg({
        type: "success",
        text: "Đăng ký thành công!",
      });
      setRegData({
        login_name: "",
        password: "",
        confirm_password: "",
        first_name: "",
        last_name: "",
        location: "",
        description: "",
        occupation: "",
      });
    } catch (err) {
      setRegMsg({ type: "error", text: err.message || "Đăng ký thất bại!" });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 4,
        minHeight: "80vh",
      }}
    >
      <Paper
        variant="outlined"
        sx={{ padding: 3, width: "100%", maxWidth: "600px" }}
      >
        <Typography variant="h5" sx={{ mb: 2 }}>
          Tạo tài khoản mới
        </Typography>

        {regMsg.text && (
          <Alert severity={regMsg.type} sx={{ mb: 2 }}>
            {regMsg.text}
          </Alert>
        )}

        <form onSubmit={handleRegister}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Login Name *"
                size="small"
                value={regData.login_name}
                onChange={(e) =>
                  handleRegisterChange("login_name", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name *"
                size="small"
                value={regData.first_name}
                onChange={(e) =>
                  handleRegisterChange("first_name", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name *"
                size="small"
                value={regData.last_name}
                onChange={(e) =>
                  handleRegisterChange("last_name", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Occupation"
                size="small"
                value={regData.occupation}
                onChange={(e) =>
                  handleRegisterChange("occupation", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Password *"
                type="password"
                size="small"
                value={regData.password}
                onChange={(e) =>
                  handleRegisterChange("password", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Confirm Password *"
                type="password"
                size="small"
                value={regData.confirm_password}
                onChange={(e) =>
                  handleRegisterChange("confirm_password", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Location"
                size="small"
                value={regData.location}
                onChange={(e) =>
                  handleRegisterChange("location", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={2}
                size="small"
                value={regData.description}
                onChange={(e) =>
                  handleRegisterChange("description", e.target.value)
                }
              />
            </Grid>
          </Grid>

          {/* Nút đăng ký chính */}
          <Button fullWidth variant="contained" type="submit" sx={{ mt: 3 }}>
            Đăng ký ngay
          </Button>

          {/* Khối nút phụ quay lại trang đăng nhập */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button
              component={Link}
              to="/login"
              size="small"
              sx={{ textTransform: "none" }}
            >
              Đã có tài khoản? Quay lại đăng nhập
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default Register;
