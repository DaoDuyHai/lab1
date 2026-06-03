import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

function TopBar({ isLoggedIn, user, onLogout, onUploadSuccess }) {
  const location = useLocation();
  const path = location.pathname;
  const [contextText, setContextText] = useState("");

  useEffect(() => {
    const updateTitle = async () => {
      const isUserOrPhotoPage =
        path.includes("/users/") || path.includes("/photos/");
      if (!isLoggedIn || !user || !isUserOrPhotoPage) {
        setContextText("");
        return;
      }
      const userId = path.split("/")[2];
      try {
        const response = await fetchModel(
          `https://tjlhg9-8081.csb.app/api/user/${userId}`
        );
        const name = response.data.last_name;
        if (path.includes("/photos/")) {
          setContextText(`Photos of ${name}`);
        } else {
          setContextText(`Details of ${name}`);
        }
      } catch (error) {
        setContextText("");
      }
    };
    updateTitle();
  }, [path, isLoggedIn, user]);

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("photo", file);

    try {
      await fetchModel("https://tjlhg9-8081.csb.app/api/photo/new", {
        method: "POST",
        body: formData,
      });

      if (onUploadSuccess) onUploadSuccess();
    } catch (err) {
      alert("Lỗi khi upload ảnh");
    }
  };

  const renderRightContent = () => {
    if (!isLoggedIn) {
      if (path.includes("/register"))
        return <Typography variant="h6">Please Register</Typography>;
      return <Typography variant="h6">Please Login</Typography>;
    }

    return (
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="topbar-upload-file"
          type="file"
          onChange={handleUpload}
        />
        <label htmlFor="topbar-upload-file">
          <Button
            variant="contained"
            component="span"
            size="small"
            color="success"
          >
            Add Photo
          </Button>
        </label>

        <Button
          variant="contained"
          onClick={onLogout}
          size="small"
          color="error"
        >
          Logout
        </Button>
      </Box>
    );
  };

  return (
    <AppBar
      position="absolute"
      variant="outlined"
      sx={{ zIndex: 1201, elevation: 0 }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">
          {isLoggedIn && user ? `Hi ${user.last_name}` : "Photo App"}
        </Typography>
        <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center" }}>
          {contextText}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {renderRightContent()}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
