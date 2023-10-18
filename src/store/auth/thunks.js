import { login, logout, checkingCredentials } from "./"
import { getRestaurants } from "../restaurants";
import { loginOnServer, refreshTokenOnServer } from "../../api/loginApi";

export const checkAuthentication = () => {
    return (dispatch) => {
        dispatch(checkingCredentials());
        const refreshToken = JSON.parse(localStorage.getItem('refresh'));
        const accessToken = JSON.parse(localStorage.getItem('access'));
        if (refreshToken !== '' && refreshToken !== null &&
            accessToken !== ''  && refreshToken !== null) {
            dispatch(getRestaurants());
            dispatch(login());
        }
        else{
            dispatch(logout());
        }
    }
}

export const doLogin = (user, pass) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());

        const response = await loginOnServer(user, pass)
        //console.log(response)
        if (response.status == 200) {
            const token = response.data
            localStorage.setItem('refresh', JSON.stringify(token.refresh))
            localStorage.setItem('access', JSON.stringify(token.access))
            dispatch(getRestaurants());
            dispatch(login());
            return;
        }
        else {
            dispatch(logout());
            return;
        }
    }
}

export const doLogout = () => {
    return (dispatch) => {
        localStorage.removeItem('refresh')
        localStorage.removeItem('access')
        dispatch(logout());
        return;
    }
}