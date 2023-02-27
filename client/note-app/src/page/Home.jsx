import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { Navigate, Outlet, useLoaderData } from "react-router-dom";
import FolderList from "../components/FolderList";
import PushNotification from "../components/PushNotification";
import UserMenu from "../components/UserMenu";

export default function Home() {
  const {data:{folders}} = useLoaderData();
  return (
    <>
      <Typography variant="h4" sx={{ marginBottom: 20 }}>
        Note App
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "right", marginBottom: 10 }}>
        <UserMenu />
        <PushNotification/>
      </Box>
      <Grid
        container
        sx={{ height: "50vh", boxShadow: "0 0 15px 0 rgb(193 193 193 / 60%)" }}
      >
        <Grid item xs={3} sx={{ height: "100%" }}>
          <FolderList
            folders={folders}
          />
        </Grid>
        <Grid item xs={9} sx={{ height: "100%" }}>
          <Outlet />
        </Grid>
      </Grid>
    </>
  );
}
