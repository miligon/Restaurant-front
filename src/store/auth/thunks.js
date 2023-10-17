import { login, logout, checkingCredentials } from "./"
import { loginOnServer, refreshToken } from "../../api/loginApi";

export const checkAuthentication = () => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
        const refreshToken = JSON.parse(localStorage.getItem('refresh'));
        if (refreshToken !== '' && refreshToken !== null) {
            const response = await refreshToken(refreshToken)
            console.log(response)
            if (response.status == 200) {
                const token = {
                    "access": response.data.access,
                    "refresh": refreshToken
                }
            }
            dispatch(login(token));
        }
        dispatch(logout());
    }
}

export const DoLogin = (user, pass) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());

        const response = await loginOnServer(user, pass)
        console.log(response)
        if (response.status == 200) {
            const token = response.data
            localStorage.setItem('refresh', JSON.stringify(token.refresh))
            localStorage.setItem('access', JSON.stringify(token.access))
            dispatch(login(token));
        }
        else {
            dispatch(logout());
        }
    }
}

export const DoLogout = () => {
    return (dispatch) => {
        localStorage.removeItem('refresh')
        dispatch(logout());
    }
}