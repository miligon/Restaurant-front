import { createSlice } from '@reduxjs/toolkit'


export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'not-authenticated',// 'authenticated', 'checking'
        logged: false

    },
    reducers: {
        login: (state) => {
            state.status='authenticated';
            state.logged = true;
        },
        logout: (state) => {
            state.status= 'not-authenticated';
            state.logged = false;
        },
        checkingCredentials: (state) => {
            state.status = 'checking'
        },
    }
})

// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials } = authSlice.actions
