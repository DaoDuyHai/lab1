import React, { useState, useEffect } from "react";
import { Box, Typography, Paper } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

function UserComments() {
  const { userId } = useParams();
  const [commentsList, setCommentsList] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const apiUrl = `https://tjlhg9-8081.csb.app/api/user/commentsOfUser/${userId}`;
      try {
        const res = await fetchModel(apiUrl);
        setCommentsList(res.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchComments();
  }, [userId]);

  return (
    <Box sx={{ p: 1 }}>
      <Typography variant="h5">Danh sach comment</Typography>
      <hr />

      {commentsList.length === 0 && (
        <Typography>Khong co comment nao.</Typography>
      )}

      {commentsList.map((item, index) => (
        <Paper
          key={index}
          variant="outlined"
          sx={{ display: "flex", p: 1, mb: 1 }}
        >
          <Link to={`/photos/${item.photoUserId}`}>
            <img
              src={`https://tjlhg9-8081.csb.app/images/${item.photoFile}`}
              alt="img"
              style={{ width: "60px", height: "60px", marginRight: "10px" }}
            />
          </Link>

          <Box>
            <Link to={`/photos/${item.photoUserId}`} style={{ color: "black" }}>
              <span>"{item.commentText}"</span>
            </Link>
            <br />
            <span style={{ fontSize: "11px", color: "gray" }}>
              Time: {new Date(item.dateTime).toLocaleString()}
            </span>
          </Box>
        </Paper>
      ))}
    </Box>
  );
}

export default UserComments;
