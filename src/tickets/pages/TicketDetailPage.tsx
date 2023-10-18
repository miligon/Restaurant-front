import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  doTicketCreate,
  doTicketUpdate,
  doTicketDelete,
} from '../../store/tickets'
import { RootState } from '../../store'
import { ticketFromServer, ticketToServer } from '../../store/interfaces'
import { AnyAction } from '@reduxjs/toolkit'

const EmptyTicket: ticketFromServer = {
  code: '',
  restaurant: 0,
  name: '',
  max_purchase_count: 0,
  purchase_count: 0,
  soldout: false,
}
export const TicketDetailPage = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { tickets, status } = useSelector((state: RootState) => state.tickets)
  const { restaurants, selectedRestaurant } = useSelector(
    (state: RootState) => state.restaurants,
  )
  const navigate = useNavigate()

  // Detect if its a new ticket
  const isEditing = id !== 'new'
  const [ticket, setTicket] = useState(EmptyTicket)

  useEffect(() => {
    // If editing an existing ticket, populate the form with the existing ticket data
    const record = isEditing && tickets.find((item) => item.code === id)
    if (record) {
      console.log('Record found:', record)
      setTicket(record)
    } else {
      console.log('Record not found for code:', id)
      setTicket(EmptyTicket)
    }
  }, [isEditing])

  const returnToTickets = () => {
    const restaurant = restaurants[selectedRestaurant].slug
    navigate(`/${restaurant}/tickets`)
  }

  const onFormSubmit = (e: any) => {
    e.preventDefault()
    const restaurant = restaurants[selectedRestaurant].slug
    let payload: ticketToServer = {
      code: undefined,
      restaurant: restaurant,
      name: ticket.name,
      max_purchase_count: ticket.max_purchase_count,
      purchase_count: ticket.soldout ? 1 : 0,
      soldout: undefined,
    }
    if (isEditing) {
      // Update Ticket
      console.log('Ticket edited:', ticket)
      payload.code = ticket.code
      dispatch(doTicketUpdate(Number(id), payload, restaurant) as any)
      returnToTickets()
    } else {
      // Create a new ticket
      dispatch(doTicketCreate(payload, restaurant) as any)
      returnToTickets()
      console.log('New ticket created:', payload)
    }
  }

  const onDelete = () => {
    // Delete Ticket
    dispatch(doTicketDelete(Number(id)) as any)
    returnToTickets()
    console.log('Ticket deleted:', ticket)
  }

  return (
    <div className='container mt-5'>
      <button className='btn btn-warning' onClick={returnToTickets}>
        Volver
      </button>
      <hr />
      <h1>{isEditing ? 'Edit Ticket' : 'Create Ticket'}</h1>
      <hr />
      <form onSubmit={onFormSubmit}>
        {isEditing && <h3>Code: {id}</h3>}
        <hr />
        <label>
          Name:
          <input
            type='text'
            value={ticket.name}
            onChange={(e) => setTicket({ ...ticket, name: e.target.value })}
          />
        </label>
        <br />
        <br />
        <label>
          Max Purchase Count:
          <input
            type='number'
            value={ticket.max_purchase_count}
            onChange={(e) =>
              setTicket({
                ...ticket,
                max_purchase_count: parseInt(e.target.value, 10),
              })
            }
          />
        </label>
        <br />
        <br />
        <label>
          Purchase Count:
          <input
            type='number'
            value={ticket.purchase_count}
            onChange={(e) =>
              setTicket({
                ...ticket,
                purchase_count: parseInt(e.target.value, 10),
              })
            }
          />
        </label>
        <hr />
        <button className='btn btn-primary' type='submit'>
          {isEditing ? 'Save Changes' : 'Create Ticket'}
        </button>
      </form>
      <hr />
      {isEditing && (
        <button className='btn btn-danger' onClick={onDelete}>
          Delete Ticket
        </button>
      )}
    </div>
  )
}
