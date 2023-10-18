import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { doTicketCreate, doTicketUpdate, doTicketDelete } from '../../store/tickets';

export const TicketDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { tickets, status } = useSelector(state => state.tickets)
  const { restaurants, selectedRestaurant } = useSelector(state => state.restaurants)
  const navigate = useNavigate();

  // Detect if its a new ticket
  const isEditing = id !== 'new';
  const [ticket, setTicket] = useState('not-found');


  useEffect(() => {
    // If editing an existing ticket, populate the form with the existing ticket data
    const record = isEditing && tickets.find(item => item.code === id);
    if (record) {
      console.log('Record found:', record);
      setTicket(record);
    } else {
      console.log('Record not found for code:', id);
      setTicket('not-found')
    }
  }, [isEditing]);

  const returnToTickets = () => {
    const restaurant = restaurants[selectedRestaurant].slug
    navigate(`/${restaurant}/tickets`)
  }

  const onFormSubmit = (e) => {
    e.preventDefault();
    const restaurant = restaurants[selectedRestaurant].slug
    if (isEditing) {
      // Update Ticket
      console.log('Ticket edited:', ticket);
      dispatch(doTicketUpdate(id, ticket, restaurant));
      returnToTickets();
    } else {
      // Create a new ticket
      const payload = ticket;
      // Delete code from payload, it will be assigned by the backend
      delete payload['code'];
      dispatch(doTicketCreate(ticket, restaurant));
      returnToTickets();
      console.log('New ticket created:', ticket);
    }
  };

  const onDelete = () => {
    const restaurant = restaurants[selectedRestaurant].slug
    // Delete Ticket
    dispatch(doTicketDelete(id, restaurant));
    returnToTickets();
    console.log("Ticket deleted:", ticket);
  }

  return (
    <div className="container mt-5">
      <button className="btn btn-warning" onClick={returnToTickets}>Volver</button>
      <hr />
      <h1>{isEditing ? 'Edit Ticket' : 'Create Ticket'}</h1>
      <hr />
      <form onSubmit={onFormSubmit}>
        {isEditing && <h3>Code: {id}</h3>}
        <hr />
        <label>
          Name:
          <input
            type="text"
            value={ticket.name}
            onChange={(e) => setTicket({ ...ticket, name: e.target.value })}
          />
        </label>
        <br /><br />
        <label>
          Max Purchase Count:
          <input
            type="number"
            value={ticket.max_purchase_count}
            onChange={(e) => setTicket({ ...ticket, max_purchase_count: parseInt(e.target.value, 10) })}
          />
        </label>
        <br /><br />
        <label>
          Purchase Count:
          <input
            type="number"
            value={ticket.purchase_count}
            onChange={(e) => setTicket({ ...ticket, purchase_count: parseInt(e.target.value, 10) })}
          />
        </label>
        <hr />
        <button className="btn btn-primary" type="submit">
          {isEditing ? 'Save Changes' : 'Create Ticket'}
        </button>
      </form>
      <hr />
      {isEditing && <button className="btn btn-danger" onClick={onDelete}>Delete Ticket</button>}
    </div>
  )
}