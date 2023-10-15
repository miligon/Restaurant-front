import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { TableTickets } from '../components/TableTickets';
import { DropdownRestaurants } from '../components/DropdownRestaurants';
import axios from 'axios';


export const axiosR = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}`
  });

  const restaurants = [
    {
        "id": 1,
        "name": "Chalupitas MX",
        "slug": "chalupitas-mx"
    },
    {
        "id": 2,
        "name": "Chipotle Los Angeles",
        "slug": "chipotle-los-angeles"
    },
    {
        "id": 3,
        "name": "Italian's Pizza NY",
        "slug": "italians-pizza-ny"
    }
]

export const TicketPage = () => {
  const [Tickets, setTickets] = useState([])
  const [SelectedRestaurant, setSelectedRestaurant] = useState('1')
  const [Restaurants, setRestaurants] = useState(restaurants)

  const onRestaurantChange = (newValue) =>{
    console.log(newValue)
    setSelectedRestaurant(newValue)
  }

  useEffect(() => {
    axiosR.get(`/api/reservations/tickets/`)
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
                <Link to='new'>Nuevo</Link>
            </div>
          </div>
          <hr />
          <TableTickets data={Tickets} />
      </div>
  )
}