import React, { useContext } from "react";
import { Button, Typography } from "@mui/material";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { AuthContext } from "../context/authProvider";
import { Navigate } from "react-router-dom";
import { graphQLrequest } from "../utils/request";
export default function Login() {
  const auth = getAuth();
  const { user } = useContext(AuthContext);
  const handleLoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const {
      user: { uid, displayName },
    } = await signInWithPopup(auth, provider);
    const { data } = await graphQLrequest({
      query: `mutation register($uid: String!, $name: String!) {
      register(uid: $uid, name: $name) {
        uid
        name
      }
    }`,
      variables: {
        uid,
        name: displayName,
      },
    });
    console.log('register', { data });
  };
  if (localStorage.getItem('accessToken')) {
    console.log(user?.uid);
    return <Navigate to={"/"} />;
  }
  return (
    <>
      <Typography variant="h5" sx={{ marginBottom: 10 }}>
        Wellcome to note app
      </Typography>
      <Button variant="outlined" onClick={handleLoginWithGoogle}>
        Login with Google
      </Button>
    </>
  );
}
