import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const data = {
  "code": "8bcb98bd-c2e6-4e7e-8d0c-c90e4fde4bf5",
  "name": "2x1 IN PIZZA",
  "maxPurchaseCount": 4,
  "purchaseCount": 4,
  "soldout": true
}

export const TicketDetailPage = ({restaurant}) => {
  const { id } = useParams();
  const isEditing = id !== 'new';

  const [ticket, setTicket] = useState({
    code: '',
    name: '',
    maxPurchaseCount: 0,
    purchaseCount: 0,
    soldout: false
  });

  useEffect(() => {
    // If editing an existing ticket, populate the form with the existing ticket data
    if (isEditing) {
      setTicket(data);
    }
  }, [isEditing]);

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      console.log('Ticket edited:', ticket);
    } else {
      console.log('New ticket created:', ticket);
    }
  };

  const onDelete = () => {
    console.log("delete")
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