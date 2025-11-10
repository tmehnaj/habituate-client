import React, { useContext } from 'react';
import { AuthContext } from '../context/Context';
import { Navigate } from 'react-router';

const AlreadyLoggedInRoutes = ({children}) => {
   const {user,loading}=useContext(AuthContext);
    if(loading){
        return <p>Loading...................</p>
    }
    if(user){
        return <Navigate to="/"></Navigate>
    }
    return children;
};

export default AlreadyLoggedInRoutes;