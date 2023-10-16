import React from "react";
import { useContext} from "react";
import { AuthContext } from "../AuthContext";
import { useNavigate } from 'react-router-dom';

// views
export const LogoutPage = () => {

  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  logout()
  navigate('/', {
    replace: true
  });
  return (
    <>
    </>
  );
}
