import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosR } from '../../auth';

export const TicketDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState({
    code: '',
    name: '',
    maxPurchaseCount: 0,
    purchaseCount: 0,
    soldout: false
  });
  const [Restaurant, setRestaurant] = useState(localStorage.getItem('restaurant'))

  // Detect if its a new ticket
  const isEditing = id !== 'new';

  useEffect(() => {
    // If editing an existing ticket, populate the form with the existing ticket data
    if (isEditing) {
      axiosR.get(`/api/reservations/tickets/${id}/`)
        .then((res) => {
          setTicket(res.data)
        })
        .catch(err => console.log(err))
    }
  }, [isEditing]);

  const returnToTickets = () => {
    navigate('/tickets', {
      replace: true
    })
  }

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      // Update Ticket
      console.log('Ticket edited:', ticket);
      axiosR.put(`/api/reservations/tickets/${id}/`, ticket)
        .then((res) => {
          returnToTickets();
        })
        .catch(err => console.log(err))
    } else {
      // Create a new ticket
      const payload = ticket;
      // Delete code from payload, it will be assigned by the backend
      delete payload['code'];
      payload['restaurant'] = Restaurant;
      axiosR.post(`/api/reservations/tickets/`, payload)
        .then((res) => {
          returnToTickets();
        })
        .catch(err => console.log(err))
      console.log('New ticket created:', ticket);
    }
  };

  const onDelete = () => {
    // Delete Ticket
    axiosR.delete(`/api/reservations/tickets/${id}/`)
        .then((res) => {
          returnToTickets();
        })
        .catch(err => console.log(err))
    console.log("Ticket deleted:", ticket)
  }

  return (
    <div className="container mt-5">
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
            value={ticket.maxPurchaseCount}
            onChange={(e) => setTicket({ ...ticket, maxPurchaseCount: parseInt(e.target.value, 10) })}
          />
        </label>
        <br /><br />
        <label>
          Purchase Count:
          <input
            type="number"
            value={ticket.purchaseCount}
            onChange={(e) => setTicket({ ...ticket, purchaseCount: parseInt(e.target.value, 10) })}
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