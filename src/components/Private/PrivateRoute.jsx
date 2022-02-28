import React from 'react'
import {Navigate,Outlet } from 'react-router-dom'
import useAuthStatus from '../../hooks/useAuthStatus'

const PrivateRoute = () => {
  //Destructure the auth status from the hook
    const {loggedIn,checkingStatus} = useAuthStatus()
   //if checking status is true, show loading screen
    if(checkingStatus){
        return <div>Loading...</div>
    }
  return (
    loggedIn ? <Outlet /> : <Navigate to="/login" />
  )
}

export default PrivateRoute