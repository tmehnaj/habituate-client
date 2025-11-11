import React, { useContext } from 'react';
import { AuthContext } from '../context/Context';
import { Navigate, useLocation } from 'react-router';

const PrivateRoutes = ({children}) => {
  const {user, loading}= useContext(AuthContext);
  const location = useLocation();
    if(loading){
        return <p>Loading............</p>
    }
    if(user){
        return children
    }
    return <Navigate state={location?.pathname} to="/login"></Navigate>;
};

export default PrivateRoutes;
