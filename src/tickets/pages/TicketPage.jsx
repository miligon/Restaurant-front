import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { TableTickets } from '../components/TableTickets';
import { DropdownRestaurants } from '../components/DropdownRestaurants';

const tickets = [
    {
        "code": "80f1cabb-2016-409d-b1d1-d452eebe4816",
        "name": "10% OFF",
        "maxPurchaseCount": 5,
        "purchaseCount": 5,
        "soldout": true
    },
    {
        "code": "da537ae1-41e8-46a8-b819-11fecff148e0",
        "name": "20% OFF",
        "maxPurchaseCount": 2,
        "purchaseCount": 2,
        "soldout": false
    },
    {
        "code": "13dd04fc-192a-45c3-a332-d64477488438",
        "name": "5% OFF",
        "maxPurchaseCount": 8,
        "purchaseCount": 3,
        "soldout": false
    },
    {
        "code": "8bcb98bd-c2e6-4e7e-8d0c-c90e4fde4bf5",
        "name": "2x1 IN PIZZA",
        "maxPurchaseCount": 4,
        "purchaseCount": 4,
        "soldout": true
    }
  ]

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
  const [Tickets, setTickets] = useState(tickets)
  const [SelectedRestaurant, setSelectedRestaurant] = useState('1')
  const [Restaurants, setRestaurants] = useState(restaurants)

  const onRestaurantChange = (newValue) =>{
    console.log(newValue)
    setSelectedRestaurant(newValue)
  }

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