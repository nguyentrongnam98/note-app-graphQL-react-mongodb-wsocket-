import { Avatar, Box, Menu, MenuItem, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/authProvider";

export default function UserMenu() {
  const { user } = useContext(AuthContext);
  const [anchorEl, setAnChorEl] = useState(null);
  const open = Boolean(anchorEl)
  const handleLogout = () => {
    user?.auth.signOut();
  };
  const handleCloseMenu = () => {
     setAnChorEl(null)
  }
  const handleClick = (e) => {
    setAnChorEl(e.currentTarget)
  }
  return (
    <>
      <Box sx={{ display: "flex" }} onClick={handleClick}>
        <Typography>{user?.displayName}</Typography>
        <Avatar
          alt="avatar"
          src={user?.photoURL}
          sx={{ width: 24, height: 24, marginLeft:'5px' }}
        />
      </Box>
      <Menu anchorEl={anchorEl} open={open} onClose={handleCloseMenu}>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
}
