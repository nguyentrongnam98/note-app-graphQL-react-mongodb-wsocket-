import { Box, Card, CardContent, Grid, List, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useParams, useLoaderData, useNavigate } from "react-router-dom";

export default function NoteList() {
  const {noteId} = useParams()
  const [activeNoteId,setActiveNoteId] = useState(noteId)
  const folder = useLoaderData()
  const navigate = useNavigate()
  useEffect(() => {
    if (noteId) {
      setActiveNoteId(noteId);
      return;
    }

    if (folder?.notes?.[0]) {
      navigate(`note/${folder.notes[0].id}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noteId, folder.notes]);
  return (
    <Grid container height={"100%"}>
      <Grid
        item
        xs={4}
        sx={{
          width: "100%",
          maxWidth: "360px",
          backgroundColor: "#F0EBE3",
          height: "100%",
          overflowY:'auto',
          padding:'10px',
          textAlign:'left'
        }}
      >
        <List
          subheader={
            <Box>
              <Typography sx={{ fontWeight: "bold" }}>Notes</Typography>
            </Box>
          }
        >
          {folder.notes.map(({ id, content }) => {
            return (
              <Link
                key={id}
                to={`note/${id}`}
                style={{ textDecoration: "none" }}
                onClick={() => setActiveNoteId(id)}
              >
                <Card sx={{ marginBottom: "5px",backgroundColor:
                id === activeNoteId ? "rgb(255 211 140)" : "#fff" }}>
                  <CardContent
                    sx={{
                      "&:last-child": { paddingBottom: "10px" },
                      padding: "10px",
                    }}
                  >
                    <div
                      style={{ fontSize: "14px", fontWeight: "bold" }}
                      dangerouslySetInnerHTML={{
                        __html: `${content.substring(0, 30) || "empty"}`,
                      }}
                    ></div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </List>
      </Grid>
      <Grid item xs={8}>
        <Outlet />
      </Grid>
    </Grid>
  );
}
