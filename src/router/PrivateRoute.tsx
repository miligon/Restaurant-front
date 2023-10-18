import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store'
import { checkAuthentication } from '../store/auth';

interface PrivateRouteProps {
    children: React.ReactNode;
  }

  export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {

    const dispatch = useDispatch();
    const { logged } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (!logged){
            dispatch( checkAuthentication() as any);
        }
    },[])

    
    return (logged)
        ? children
        : <Navigate to={"/login"}/>
}

export default PrivateRoute