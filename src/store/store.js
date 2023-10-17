import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth'
import { restaurantSlice } from './restaurants'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    restaurants: restaurantSlice.reducer,
  },
})