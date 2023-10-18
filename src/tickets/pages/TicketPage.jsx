import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { refreshTickets } from '../../store/tickets';
import { TableTickets } from '../components/TableTickets';
import { DropdownRestaurants } from '../components/DropdownRestaurants';


export const TicketPage = () => {

  const dispatch = useDispatch();
  const { tickets, status } = useSelector(state => state.tickets)
  const { restaurants, selectedRestaurant } = useSelector(state => state.restaurants)

  //Retrieve ticket's list per restaurant
  useEffect(() => {
    const restaurantSlug = restaurants[selectedRestaurant].slug
    dispatch(refreshTickets(restaurantSlug));
  }, [selectedRestaurant]);

  useEffect(() => {
    const restaurantSlug = restaurants[selectedRestaurant].slug
    if (status === 'not-refreshed') {
      dispatch(refreshTickets(restaurantSlug));
    }
  }, [status]);

  return (
    <div className="container mt-5">
      <h1>Tickets</h1>
      <hr />
      <div className='row'>
        <div className='col'>
          <DropdownRestaurants />
        </div>
        <div className='col'>
          <Link to='new'>New</Link>
        </div>
      </div>
      <hr />
      {
        (status == 'loaded') ?
          (<TableTickets data={tickets} />)
          :
          (<h4>Loading . . .</h4>)
      }
      <hr />
      <Link to='/logout'>Logout</Link>
    </div>
  )
}