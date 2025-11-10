import React, { useContext } from 'react';
import { AuthContext } from '../context/Context';
import { Navigate } from 'react-router';

const PrivateRoutes = ({children}) => {
  const {user, loading}= useContext(AuthContext);
    if(loading){
        return <p>Loading............</p>
    }
    if(user){
        return children
    }
    return <Navigate to="/login"></Navigate>;
};

export default PrivateRoutes;
