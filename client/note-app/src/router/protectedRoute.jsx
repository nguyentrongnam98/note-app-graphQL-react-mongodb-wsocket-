import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
      return;
    }
  },[])
  return <Outlet />;
}
