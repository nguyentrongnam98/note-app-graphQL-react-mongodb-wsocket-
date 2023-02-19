import { Card, CardContent, List, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function FolderList({ folders }) {
  const {folderId} = useParams();
  const [activeFolder, setActiveFolder] = useState(folderId);
  return (
    <List
      sx={{
        width: "100%",
        backgroundColor: "#7D9D9C",
        height: "100%",
        padding: "10px",
        textAlign: "left",
        overflowY: "auto",
      }}
      subheader={
        <Box>
          <Typography sx={{ fontWeight: "bold", color: "white" }}>
            Folders
          </Typography>
        </Box>
      }
    >
      {folders.map(({ id, name }) => (
        <Link key={id} to={`folders/${id}`} style={{ textDecoration: "none" }}>
          <Card
            sx={{
              marginBottom: "5px",
              backgroundColor:
                id === activeFolder ? "rgb(255 211 140)" : "#fff",
            }}
            onClick={() => setActiveFolder(id)}
          >
            <CardContent
              sx={{
                "&:last-child": { paddingBottom: "10px" },
                padding: "10px",
              }}
            >
              <Typography sx={{fontSize:'16px', fontWeight:'bold'}}>{name}</Typography>
            </CardContent>
          </Card>
        </Link>
      ))}
    </List>
  );
}
