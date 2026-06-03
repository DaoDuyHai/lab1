import React, { useState, useEffect, useCallback } from "react";
import {
  Typography,
  Divider,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Box,
  CircularProgress,
  TextField,
  Button,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

// 🔄 NHẬN THÊM CALLBACK ONUPLOADSUCCESS TỪ APP.JS TRUYỀN XUỐNG
function UserPhotos({ photoTrigger, onUploadSuccess }) {
  const { userId } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  const [photos, setPhotos] = useState(null);
  const [commentTexts, setCommentTexts] = useState({});

  const loadPhotos = useCallback(async () => {
    const apiUrl = `https://tjlhg9-8081.csb.app/api/photo/photosOfUser/${userId}`;
    try {
      const res = await fetchModel(apiUrl);
      setPhotos(res.data);
    } catch (err) {
      console.error("Lỗi lấy ảnh:", err);
      setPhotos([]);
    }
  }, [userId]);

  useEffect(() => {
    loadPhotos();
  }, [loadPhotos, photoTrigger]);

  const handleTextChange = (photoId, value) => {
    setCommentTexts((prev) => ({ ...prev, [photoId]: value }));
  };

  const handleAddComment = async (photoId) => {
    const text = commentTexts[photoId];
    if (!text || !text.trim()) return;

    const apiUrl = `https://tjlhg9-8081.csb.app/api/photo/commentsOfPhoto/${photoId}`;
    try {
      await fetchModel(apiUrl, {
        method: "POST",
        body: { comment: text },
      });
      setCommentTexts((prev) => ({ ...prev, [photoId]: "" }));
      loadPhotos();

      // 🔥 [KÍCH HOẠT] Bắn tín hiệu ngược lên App.js để Sidebar tự động load lại số đếm mới
      if (onUploadSuccess) {
        onUploadSuccess();
      }
    } catch (err) {
      alert("Không thể gửi bình luận. Vui lòng thử lại!");
    }
  };

  if (photos === null) {
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
        <CircularProgress size={50} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Đang lấy danh sách ảnh...
        </Typography>
      </Box>
    );
  }

  if (photos.length === 0) {
    return (
      <Box sx={{ padding: 2 }}>
        <Typography sx={{ padding: 2 }}>Người dùng này chưa có ảnh.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 2 }}>
      {photos.map((photo) => (
        <Card
          key={photo._id}
          variant="outlined"
          sx={{ marginBottom: 5, boxShadow: "none" }}
        >
          {/* Ngày đăng ảnh */}
          <CardHeader
            title={`Đăng lúc: ${new Date(photo.date_time).toLocaleString()}`}
            titleTypographyProps={{ variant: "body2" }}
          />

          {/* Hình ảnh đăng tải */}
          <CardMedia
            component="img"
            image={`https://tjlhg9-8081.csb.app/images/${photo.file_name}`}
            alt="User post"
            sx={{ height: "auto", maxHeight: "600px", objectFit: "contain" }}
          />

          <CardContent>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
              Bình luận
            </Typography>
            <Typography>Nghề nghiệp: {user?.occupation}</Typography>
            <Divider />

            {/* HIỂN THỊ DANH SÁCH BÌNH LUẬN */}
            {!photo.comments || photo.comments.length === 0 ? (
              <Typography
                variant="caption"
                color="textSecondary"
                sx={{ display: "block", mt: 1 }}
              >
                Chưa có bình luận nào.
              </Typography>
            ) : (
              photo.comments.map((c) => (
                <Box
                  key={c._id}
                  sx={{ mt: 1.5, pb: 1, borderBottom: "1px solid #eee" }}
                >
                  <Typography variant="body2">
                    <Link
                      to={`/users/${c.user_id._id}`}
                      style={{
                        textDecoration: "none",
                        fontWeight: "bold",
                        color: "inherit",
                      }}
                    >
                      {c.user_id.first_name} {c.user_id.last_name}
                    </Link>

                    <Box
                      component="span"
                      sx={{ fontSize: "0.75rem", ml: 1.5, color: "gray" }}
                    >
                      {new Date(c.date_time).toLocaleString()}
                    </Box>
                  </Typography>

                  <Typography variant="body1" sx={{ mt: 0.5 }}>
                    {c.comment}
                  </Typography>
                </Box>
              ))
            )}

            {/* KHỐI Ô NHẬP BÌNH LUẬN MỚI */}
            <Box
              sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 1 }}
            >
              <TextField
                label="Thêm bình luận của bạn..."
                multiline
                rows={2}
                variant="outlined"
                fullWidth
                value={commentTexts[photo._id] || ""}
                onChange={(e) => handleTextChange(photo._id, e.target.value)}
              />
              <Button
                variant="contained"
                sx={{ alignSelf: "flex-end", textTransform: "none" }}
                onClick={() => handleAddComment(photo._id)}
                disabled={
                  !commentTexts[photo._id] || !commentTexts[photo._id].trim()
                }
              >
                Gửi bình luận
              </Button>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default UserPhotos;
