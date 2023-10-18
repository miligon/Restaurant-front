import { createSlice } from '@reduxjs/toolkit'
import { ticketFromServer } from '../interfaces'

export const ticketsSlice = createSlice({
  name: 'tickets',
  initialState: {
    status: 'not-loaded', // loading, loaded, not-refreshed
    tickets: [] as ticketFromServer[],
  },
  reducers: {
    setTickets: (state, action) => {
      state.status = 'loaded'
      state.tickets = action.payload
    },
    setLoading: (state) => {
      state.status = 'loading'
    },
    setAwaitingRefresh: (state) => {
      state.status = 'not-refreshed'
    },
  },
})

export const { setTickets, setLoading, setAwaitingRefresh } =
  ticketsSlice.actions
