import axios from "axios";

export const loginOnServer = async (user = '', pass = '') => {
    const base_url = import.meta.env.VITE_BASE_URL;

    console.log(`${base_url}/api/auth/jwt/create/`)
    const response = await axios.post(`${base_url}/api/auth/jwt/create/`, {
        "username": user,
        "password": pass
    })

    return response
}

export const refreshToken = async (token = '') => {
    const base_url = import.meta.env.VITE_BASE_URL;

    console.log(`${base_url}/api/auth/jwt/refresh/`)
    const response = await axios.post(`${base_url}/api/auth/jwt/refresh/`, {
        "refresh": token
    })
    return response
}