import React from "react";
import { useDispatch } from 'react-redux';
import { doLogout } from '../../store/auth/thunks';
import { Navigate } from 'react-router-dom';

// views
export const LogoutPage = () => {
  const dispatch = useDispatch();
  dispatch(doLogout() as any)
  
  return (
    <>
      <Navigate to="/login" />
    </>
  );
}
