import { createBrowserRouter } from "react-router-dom";
import Note from "../components/Note";
import NoteList from "../components/NoteList";
import { AuthLayout } from "../layout/AuthLayout";
import Error from "../page/Error";
import Home from "../page/Home";
import Login from "../page/Login";
import { foldersLoader } from "../utils/folders";
import { noteLoader, notesLoader } from "../utils/note";
import ProtectedRoute from "./protectedRoute";

export default createBrowserRouter([
  {
    element: <AuthLayout />,
    errorElement: <Error />,
    children: [
      {
        element: <Login />,
        path: "/login",
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <Home />,
            path: "/",
            loader: foldersLoader,
            children: [
              {
                element: <NoteList />,
                path: "folders/:folderId",
                loader: notesLoader,
                children: [
                  {
                    element: <Note />,
                    path: "note/:noteId",
                    loader: noteLoader
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);
