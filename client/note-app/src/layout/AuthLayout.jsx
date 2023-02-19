import { Outlet } from "react-router-dom"
import AuthProvider from "../context/authProvider"

export const AuthLayout  = () => {
   return (
      <AuthProvider>
         <Outlet/>
      </AuthProvider>
   )
}