import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { TableTickets } from '../components/TableTickets';
import { DropdownRestaurants } from '../components/DropdownRestaurants';
import { axiosR } from '../../auth'

export const TicketPage = () => {
  const [Tickets, setTickets] = useState([])
  const [SelectedRestaurant, setSelectedRestaurant] = useState(localStorage.getItem('restaurant'))
  const [Restaurants, setRestaurants] = useState([])

  const onRestaurantChange = (newValue) =>{
    console.log(newValue)
    setSelectedRestaurant(newValue)
  }

  //Retrieve restaurant's list
  useEffect(() => {
    axiosR.get(`/api/restaurants/`)
      .then((res) => {
            setRestaurants(res.data)
          })
      .catch( err => console.log(err))
  },[]);

  //Retrieve ticket's list per restaurant
  useEffect(() => {
    axiosR.get(`/api/reservations/tickets/?restaurant=${SelectedRestaurant}`)
      .then((res) => {
            setTickets(res.data)
          })
      .catch( err => console.log(err))
  },[SelectedRestaurant]);

  return (
      <div className="container mt-5">
          <h1>Tickets</h1>
          <hr />
          <div className='row'>
            <div className='col'>
            <DropdownRestaurants
                onRestaurantChange={onRestaurantChange}
                restaurants={Restaurants}
            />
            </div>
            <div className='col'>
                <Link to='new'>New</Link>
            </div>
          </div>
          <hr />
          <TableTickets data={Tickets} />
          <hr />
          <Link to='/logout'>Logout</Link>
      </div>
  )
}