import { createSlice } from '@reduxjs/toolkit'


export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'not-authenticated',// 'authenticated', 'checking'
        accessToken: '',
        refreshToken: '',
        logged: false

    },
    reducers: {
        login: (state, action) => {
            state.status='authenticated';
            state.accessToken=action.payload.access;
            state.refreshToken=action.payload.refresh;
            state.logged = true;
        },
        logout: (state) => {
            state.status= 'not-authenticated';
            state.accessToken=null;
            state.refreshToken=null;
            state.logged = false;
        },
        checkingCredentials: (state) => {
            state.status = 'checking'
        },
    }
})

// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials } = authSlice.actions
