import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth'
import { restaurantSlice } from './restaurants'
import { ticketsSlice } from './tickets'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    restaurants: restaurantSlice.reducer,
    tickets: ticketsSlice.reducer
  },
})