import { NoteAddOutlined } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  List,
  Tooltip,
  Typography,
} from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  Link,
  Outlet,
  useParams,
  useLoaderData,
  useNavigate,
  useSubmit,
} from "react-router-dom";

export default function NoteList() {
  const { noteId, folderId } = useParams();
  const [activeNoteId, setActiveNoteId] = useState(noteId);
  const folder = useLoaderData();
  const navigate = useNavigate();
  const submit = useSubmit();
  console.log('[NoteLIST]',  folder );
  const handleAddNewNote = () => {
    submit(
      {
        content: "",
        folderId,
      },
      { method: "post", action: `folders/${folderId}` }
    );
  };
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
          overflowY: "auto",
          padding: "10px",
          textAlign: "left",
        }}
      >
        <List
          subheader={
            <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <Typography sx={{ fontWeight: "bold" }}>Notes</Typography>
              <Tooltip title="Add note" onClick={handleAddNewNote}>
                <IconButton size="small">
                  <NoteAddOutlined />
                </IconButton>
              </Tooltip>
            </Box>
          }
        >
          {folder.notes?.map(({ id, content, updatedAt }) => {
            return (
              <Link
                key={id}
                to={`note/${id}`}
                style={{ textDecoration: "none" }}
                onClick={() => setActiveNoteId(id)}
              >
                <Card
                  sx={{
                    marginBottom: "5px",
                    backgroundColor:
                      id === activeNoteId ? "rgb(255 211 140)" : "#fff",
                  }}
                >
                  <CardContent
                    sx={{
                      "&:last-child": { paddingBottom: "10px" },
                      padding: "10px",
                    }}
                  >
                    <div
                      style={{ fontSize: "14px", fontWeight: "bold" }}
                      dangerouslySetInnerHTML={{
                        __html: `${content.substring(0, 30) || "Empty"}`,
                      }}
                    ></div>
                    <Typography sx={{fontSize:'10px'}}>{moment(updatedAt).format('MMMM Do YYYY, h:mm:ss a')}</Typography>
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
