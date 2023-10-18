import { Dispatch } from "redux";
import { useDispatch } from 'react-redux';
import { login, logout, checkingCredentials } from "./"
import { getRestaurants } from "../restaurants";
import { loginOnServer } from "../../api/loginApi";
import { LocalStorageDataToken } from "../interfaces";

export const checkAuthentication = () => {
    return (dispatch: Dispatch) => {
        dispatch(checkingCredentials());
        const localStorageAccessToken: string | null = localStorage.getItem('access');
        const localStorageRefreshToken: string | null = localStorage.getItem('refresh');
        let token: LocalStorageDataToken = {
            access: '',
            refresh: '',
        };
        if (typeof localStorageAccessToken === "string" && typeof localStorageRefreshToken === "string"){
            token = {
                access: JSON.parse(localStorageAccessToken),
                refresh: JSON.parse(localStorageRefreshToken)
            }
            if (token.access !== '' && token.refresh !=='') {
                dispatch(getRestaurants() as any);
                dispatch(login());
            }
        }
        dispatch(logout());
    }
}

export const doLogin = (user: string, pass: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(checkingCredentials());

        const response = await loginOnServer(user, pass)
        //console.log(response)
        if (response.status == 200) {
            const token = response.data
            localStorage.setItem('refresh', JSON.stringify(token.refresh))
            localStorage.setItem('access', JSON.stringify(token.access))
            dispatch(getRestaurants() as any);
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
    return (dispatch: Dispatch) => {
        localStorage.removeItem('refresh')
        localStorage.removeItem('access')
        dispatch(logout());
        return;
    }
}