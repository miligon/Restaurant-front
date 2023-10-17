import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { TableTickets } from '../components/TableTickets';
import { DropdownRestaurants } from '../components/DropdownRestaurants';
import { getRestaurantList, getTicketList } from '../../api/ticketsApi';

export const TicketPage = () => {
  const { restaurant } = useParams();
  const [Tickets, setTickets] = useState([]);
  const [SelectedRestaurant, setSelectedRestaurant] = useState(restaurant);//localStorage.getItem('restaurant'));
  const [Restaurants, setRestaurants] = useState([]);

  console.log(restaurant)
  const onRestaurantChange = (newValue) =>{
    console.log(newValue)
    setSelectedRestaurant(newValue)
  }

  //Retrieve restaurant's list
    useEffect(() => {
        getRestaurantList()
            .then((res) => {
                setRestaurants(res.data)
            })
    }, []);

  //Retrieve ticket's list per restaurant
    useEffect(() => {
        getTicketList(restaurant)
            .then((res) => {
                setTickets(res.data)
            })
    }, [restaurant]);

  return (
      <div className="container mt-5">
          <h1>Tickets</h1>
          <hr />
          <div className='row'>
            <div className='col'>
            <DropdownRestaurants
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