import React from "react";
import { useContext} from "react";
import { AuthContext } from "../auth/AuthContext";
import { useNavigate } from 'react-router-dom';

import "../assets/styles/Login.css"

// views
export default function LogoutPage() {

  const { logout } = useContext( AuthContext );
  const navigate = useNavigate();
  logout()
  localStorage.removeItem('lastPath')
  navigate('/', {
    replace: true
  });
  return (
  <>
  </>
  );
}
