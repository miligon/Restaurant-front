import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { setCurrentRestaurant } from '../../store/restaurants/thunks'
import { RootState } from '../../store'

export const DropdownRestaurants = () => {
  const { restaurants, selectedRestaurant, status } = useSelector(
    (state: RootState) => state.restaurants,
  )
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleRestaurantChange = (event: any) => {
    // Handles the change on Restaurant value
    const index = event.target.value
    const selectedSlug = restaurants[index].slug
    dispatch(setCurrentRestaurant(index) as any)
    navigate(`/${selectedSlug}/tickets`)
  }

  return (
    <>
      {status == 'loaded' ? (
        <label>
          Restaurant:
          <select
            name='selectRestaurant'
            value={selectedRestaurant}
            onChange={handleRestaurantChange}
          >
            {restaurants.map(({ name }, index) => {
              return (
                <option key={index} value={index}>
                  {name}
                </option>
              )
            })}
          </select>
        </label>
      ) : (
        <p>Loading...</p>
      )}
    </>
  )
}
