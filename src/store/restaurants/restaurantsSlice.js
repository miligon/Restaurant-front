import { createSlice } from '@reduxjs/toolkit'


export const restaurantSlice = createSlice({
    name: 'restaurants',
    initialState: {
        status: 'not-loaded', // loading, loaded
        restaurants: [],
        selectedRestaurant: null,
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
