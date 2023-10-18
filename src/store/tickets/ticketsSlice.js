import { createSlice } from '@reduxjs/toolkit'


export const ticketsSlice = createSlice({
    name: 'tickets',
    initialState: {
        status: 'not-loaded', // loading, loaded, not-refreshed
        tickets: [],
    },
    reducers: {
        setTickets: (state, action) => {
            state.status = 'loaded';
            state.tickets = action.payload;
        },
        setLoading: (state) => {
            state.status = 'loading'
        },
        setAwaitingRefresh: (state) => {
            state.status = 'not-refreshed'
        },
    }
})

export const { setTickets, setLoading, setAwaitingRefresh } = ticketsSlice.actions
