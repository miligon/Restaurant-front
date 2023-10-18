import { createSlice } from '@reduxjs/toolkit'
import { restaurant } from '../interfaces';


export const restaurantSlice = createSlice({
    name: 'restaurants',
    initialState: {
        status: 'not-loaded', // loading, loaded
        restaurants: [] as restaurant[],
        selectedRestaurant: 0,
    },
    reducers: {
        setRestaurants: (state, action) => {
            state.status = 'loaded';
            state.restaurants = action.payload;
            state.selectedRestaurant = 0;
        },
        setLoading: (state) => {
            state.status = 'loading'
        },
        setSelectedRestaurant: (state, action) => {
            state.selectedRestaurant = Number(action.payload.index);
        },
    }
})

export const { setRestaurants, setLoading, setSelectedRestaurant } = restaurantSlice.actions
