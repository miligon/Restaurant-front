import React from "react";
import { useDispatch } from 'react-redux';
import { DoLogout } from '../../store/auth/thunks';
import { Navigate } from 'react-router-dom';

// views
export const LogoutPage = () => {
  const dispatch = useDispatch();
  dispatch(DoLogout())
  
  return (
    <>
      <Navigate to="/login" />
    </>
  );
}
