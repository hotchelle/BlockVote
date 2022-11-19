import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';

//This component makes sure that the user has access to components after signing in to the application
//Wrap this component on any component that you need to use that happens after authentication
export default function ProtectedRoute({children}) {
  
  // Importing user from context to check where a user existed to access other pages or not
  let  { user } = useUserAuth();

  // If a user does not exist then take them back to the login page
    if(!user)
    {
        return <Navigate to = "/"/>
    }
    return children;
}
