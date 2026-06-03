import React, { useState, useEffect } from "react";
import {
  Divider,
  List,
  ListItemText,
  Typography,
  ListItemButton,
  Box,
  Badge,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

function UserList({ photoTrigger }) {
  const [users, setUsers] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const getUsers = async () => {
      const apiUrl = "https://tjlhg9-8081.csb.app/api/user/list";
      try {
        const res = await fetchModel(apiUrl);
        setUsers(res.data);
      } catch (err) {
        console.error("Lỗi khi gọi API UserList:", err);
        setUsers([]);
      }
    };
    getUsers();
  }, [photoTrigger]);

  return (
    <Box>
      <Typography variant="h6" sx={{ padding: 2, fontWeight: "bold" }}>
        Users List
      </Typography>

      <List component="nav">
        {users.map((item) => {
          const isSelected = location.pathname.includes(item._id);

          return (
            <React.Fragment key={item._id}>
              <ListItemButton
                component={Link}
                to={`/users/${item._id}`}
                selected={isSelected}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <ListItemText
                  primary={`${item.first_name} ${item.last_name}`}
                />

                <Box sx={{ display: "flex", gap: 3, paddingRight: 1 }}>
                  <Badge
                    badgeContent={item.photoCount || 0}
                    color="success"
                    max={99}
                  />

                  <Link
                    to={`/comments/${item._id}`}
                    style={{ textDecoration: "none" }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Badge
                      badgeContent={item.commentCount || 0}
                      color="error"
                      max={99}
                    />
                  </Link>
                </Box>
              </ListItemButton>

              <Divider />
            </React.Fragment>
          );
        })}
      </List>
    </Box>
  );
}

export default UserList;
