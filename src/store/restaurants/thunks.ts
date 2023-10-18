import { Dispatch } from 'redux'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { setRestaurants, setLoading, setSelectedRestaurant } from '.'
import { getRestaurantList } from '../../api'
import { AxiosResponse } from 'axios'

export const getRestaurants = () => {
  return async (dispatch: Dispatch) => {
    dispatch(setLoading())
    const restaurantList: AxiosResponse<any, any> | string =
      await getRestaurantList()
    if (typeof restaurantList !== 'string') {
      if (restaurantList.status === 200) {
        dispatch(setRestaurants(restaurantList.data))
      }
    }
    dispatch(setRestaurants([]))
  }
}

export const setCurrentRestaurant = (restaurantIndex: number) => {
  return (dispatch: Dispatch) => {
    dispatch(setSelectedRestaurant({ index: restaurantIndex }))
  }
}
