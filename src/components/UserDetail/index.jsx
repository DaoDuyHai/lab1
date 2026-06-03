import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Box,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useParams, Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(null);

    const getUserDetail = async () => {
      const apiUrl = `https://tjlhg9-8081.csb.app/api/user/${userId}`;
      try {
        const response = await fetchModel(apiUrl);
        setUser(response.data);
      } catch (err) {
        console.error("Lỗi lấy chi tiết User:", err);
      }
    };

    getUserDetail();
  }, [userId]);

  // Giao diện Loading lúc chờ API trả dữ liệu
  if (!user) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
          width: "100%",
        }}
      >
        <CircularProgress size={50} thickness={4} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Đang tải thông tin người dùng...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: "20px" }}>
      <Paper variant="outlined" sx={{ padding: "24px" }}>
        {/* Tên và Họ của User */}
        <Typography variant="h4" sx={{ mb: 3 }}>
          {user.first_name} {user.last_name}
        </Typography>

        {/* Địa điểm */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            Location:
          </Typography>
          <Typography variant="body1">{user.location}</Typography>
        </Box>

        {/* Nghề nghiệp */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            Occupation:
          </Typography>
          <Typography variant="body1">{user.occupation}</Typography>
        </Box>

        {/* Mô tả bản thân */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            Description:
          </Typography>
          <Typography variant="body1" sx={{ mt: 0.5, py: 1 }}>
            {user.description}
          </Typography>
        </Box>

        {/* Nút bấm dẫn sang trang xem ảnh */}
        <Button
          variant="contained"
          component={Link}
          to={`/photos/${userId}`}
          sx={{ mt: 2, textTransform: "none" }}
        >
          See Photos
        </Button>
      </Paper>
    </Box>
  );
}

export default UserDetail;
