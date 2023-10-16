import { useReducer } from 'react';
import { AuthContext } from './AuthContext';
import { authReducer, types } from './AuthReducer';
import axios from 'axios';

// Inicialization values for Reducer
const init = () => {
  const data = {
    access: JSON.parse(localStorage.getItem('access')),
    refresh: JSON.parse(localStorage.getItem('refresh')),
  }
  return {
    logged: !!(data.access && data.refresh),
    user: data,
  }
}

export const AuthProvider = ({ children }) => {

  const [authState, dispatch] = useReducer(authReducer, {}, init);

  const login = async (username = '', pass = '') => {
    const base_url = import.meta.env.VITE_BASE_URL;

    console.log(`${base_url}/api/auth/jwt/create/`)
    const response = await axios.post(`${base_url}/api/auth/jwt/create/`, {
      "username": username,
      "password": pass
    })

    // If logged in store token
    if (response.status == 200) {
      const action = { type: types.login, payload: response.data }
      localStorage.setItem('access', JSON.stringify(response.data.access));
      localStorage.setItem('refresh', JSON.stringify(response.data.refresh));
      dispatch(action);
      return "OK"
    }
    else {
      return response.statusText
    }
  }

  // If logged out delete token
  const logout = () => {
    const action = { type: types.logout };
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
    dispatch(action);
  }


  return (
    <AuthContext.Provider value={{
      ...authState,

      // Methods
      login,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
}