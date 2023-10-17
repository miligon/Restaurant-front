import axios from 'axios'


export const axiosR = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}`,
    /*validateStatus: function (status) {
        //Resolve only whe status code is less than 500
        return status < 500;
    }*/
});

// Use authentication token on every request
axiosR.interceptors.request.use(
    config => {
        const token = JSON.parse(localStorage.getItem('access'))
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token
        }
        return config
    },
    error => {
        Promise.reject(error)
    }
)

axiosR.interceptors.response.use(
    response => {
        return response
    },

    // In case of error ...
    function (error) {
        const originalRequest = error.config
        // If there was an error at refreshing token
        if (
            error.response.status === 401 &&
            originalRequest.url === `/api/auth/jwt/refresh/`
        ) {
            navigate("/login", {
                replace: true
            });
            return Promise.reject(error)
        }
        // If token has expired
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true
            const refreshToken = JSON.parse(localStorage.getItem('refresh'))
            // Try to renew token
            return axios
                .post(`${import.meta.env.VITE_BASE_URL}/api/auth/jwt/refresh/`, {
                    refresh: refreshToken
                })
                .then(res => {
                    if (res.status === 200) {
                        localStorage.setItem('access', JSON.stringify(res.data.access));
                        axios.defaults.headers.common['Authorization'] =
                            'Bearer ' + JSON.parse(localStorage.getItem('access'))
                        // If token is renewed, retry the original request
                        return axios(originalRequest)
                    }
                })
        }
        return Promise.reject(error)
    }
)