import { CreateNewFolderOutlined } from "@mui/icons-material";
import {
    Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { addNewFolder } from "../utils/folders";

export default function NewFolder() {
    const [newFolderName,setNewFolderName] = useState();
    const [searchParams,setSearchParams] = useSearchParams()
    const [open,setOpen] = useState(false)
    const popupName = searchParams.get("popup")
    const navigate = useNavigate()
    const handleNewFolderNameChange = (e) => {
        setNewFolderName(e.target.value)
    }
  const handleFolderPopup = () => {
    setSearchParams({popup:"Add_folder"})
  };
  const handleClose = () => {
    setOpen(false)
    setNewFolderName("")
    navigate(-1)
  }
  const handleOk = async () => {
    const { addFolder } = await addNewFolder({name:newFolderName})
    setOpen(false)
    navigate(-1)
  }
  useEffect(() => {
   if (popupName === "Add_folder") {
    setOpen(true)
    return
   }
   setOpen(false)
  },[popupName])
  return (
    <div>
      <Tooltip title="Add folder" onClick={handleFolderPopup}>
        <IconButton size="small">
          <CreateNewFolderOutlined sx={{ color: "white" }} />
        </IconButton>
      </Tooltip>
      <Dialog open={open}>
        <DialogTitle>New folder</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Folder Name"
            fullWidth
            size="small"
            variant="standard"
            sx={{ width: "400px" }}
            autoComplete="off"
            value={newFolderName}
            onChange={handleNewFolderNameChange}
          ></TextField>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleOk}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
