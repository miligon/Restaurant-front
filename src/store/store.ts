import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { authSlice } from './auth'
import { restaurantSlice } from './restaurants'
import { ticketsSlice } from './tickets'

// Define the RootState type
// export type RootState = {
//   auth: ReturnType<typeof authSlice.reducer>;
//   restaurants: ReturnType<typeof restaurantSlice.reducer>;
//   tickets: ReturnType<typeof ticketsSlice.reducer>;
// };
export const store = configureStore({
  reducer: combineReducers({
    auth: authSlice.reducer,
    restaurants: restaurantSlice.reducer,
    tickets: ticketsSlice.reducer,
  }),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

