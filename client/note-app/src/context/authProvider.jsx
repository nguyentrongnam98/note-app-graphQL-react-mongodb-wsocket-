import React, { createContext, useEffect, useState } from 'react'
import { getAuth } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
export const AuthContext = createContext()
export default function AuthProvider({children}) {
  const [user,setUser] = useState()
  const auth = getAuth();
  const navigate = useNavigate()
  const [isLoading,setIsLoading] = useState(true)
  useEffect(() => {
   const unSubcribedAuth = auth.onIdTokenChanged((user) => {
      if(user?.uid) {
        setUser(user)
        if (user.accessToken !== localStorage.getItem('accessToken')) {
          localStorage.setItem('accessToken',user.accessToken)
          window.location.reload()
        }
        setIsLoading(false)
        return
      }
      setIsLoading(false)
      setUser({})
      localStorage.clear()
      navigate('/login')
   })
   return () => {
    unSubcribedAuth();
   }
  },[auth])
  return (
    <AuthContext.Provider value={{user,setUser}}>
        {isLoading ? <CircularProgress/> :children}
    </AuthContext.Provider>
  )
}
