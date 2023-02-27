import NotificationIcon from "@mui/icons-material/Notifications";
import React, { useEffect, useState } from "react";
import { createClient } from "graphql-ws";
import { Badge, Menu, MenuItem } from "@mui/material";

const client = createClient({
  url: "ws://localhost:4000/graphql",
});

const query = `subscription pushNotification {
    notification {
      message
    }
  }`;
export default function PushNotification() {
  const [invisible, setInvisible] = useState(true);
  const [notification, setNotification] = useState("");
  const [anchorEl, setAnChorEl] = useState(null);
  const open = Boolean(anchorEl)
  const handleCloseMenu = () => {
    setAnChorEl(null);
    setNotification("")
    setInvisible(true)
  };
  const handleClick = (e) => {
      if (notification) {
        setAnChorEl(e.currentTarget)
      }
  }
  useEffect(() => {
    (async () => {
      const onNext = (data) => {
        setInvisible(false);
        const message = data?.data?.notification?.message;
        setNotification(message);
        console.log("[PUSH NOTIFICATION]", { data });
      };

      await new Promise((resolve, reject) => {
        client.subscribe(
          {
            query,
          },
          {
            next: onNext,
            error: reject,
            complete: resolve,
          }
        );
      });
    })();
  }, []);
  return (
    <div>
      <Badge color="primary" variant="dot" invisible={invisible} overlap='circular'
        sx={{ '&:hover': { cursor: 'pointer' }, ml: '5px' }}>
        <NotificationIcon onClick={handleClick} sx={{ color: '#7D9D9C' }}/>
      </Badge>
      <Menu anchorEl={anchorEl} open={open} onClose={handleCloseMenu}>
        <MenuItem onClick={handleCloseMenu}>{notification}</MenuItem>
      </Menu>
    </div>
  );
}
