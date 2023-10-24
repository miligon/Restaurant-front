import React from 'react'
//import { useSelector, useDispatch } from 'react-redux'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { useNavigate } from 'react-router-dom'
import { setCurrentRestaurant } from '../../store/restaurants/thunks'
import { RootState } from '../../store'

export const DropdownRestaurants = () => {
  const { restaurants, selectedRestaurant, status } = useAppSelector(
    (state: RootState) => state.restaurants,
  )
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleRestaurantChange = (event: any) => {
    // Handles the change on Restaurant value
    const index = event.target.value
    const selectedSlug = restaurants[index].slug
    dispatch(setCurrentRestaurant(index))
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
