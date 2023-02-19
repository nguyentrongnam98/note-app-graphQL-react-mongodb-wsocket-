import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import routes from "./router";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Container } from "@mui/material";
import './firebase/config';
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
ReactDOM.createRoot(document.getElementById("root")).render(
    <Container maxWidth="lg" sx={{textAlign:'center', marginTop:'50px'}}>
      <RouterProvider router={routes}>
        <App />
      </RouterProvider>
    </Container>
);
