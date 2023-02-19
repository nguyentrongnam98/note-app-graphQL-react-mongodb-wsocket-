import React, { useContext } from "react";
import { Button, Typography } from "@mui/material";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { AuthContext } from "../context/authProvider";
import { Navigate } from "react-router-dom";
export default function Login() {
  const auth = getAuth();
  const {user} = useContext(AuthContext)
  const handleLoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    await signInWithPopup(auth,provider)
  }
  if (user?.uid) {
   return <Navigate to={'/'}/>
  }
  return (
    <>
      <Typography variant="h5" sx={{marginBottom:10}}>Wellcome to note app</Typography>
      <Button variant="outlined" onClick={handleLoginWithGoogle}>Login with Google</Button>
    </>
  );
}
