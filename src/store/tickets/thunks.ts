import { Dispatch } from 'redux'
import { setTickets, setLoading, setAwaitingRefresh } from '.'
import { ticketFromServer, ticketToServer } from '../interfaces'
import {
  getTicketList,
  updateTicketDetail,
  createTicketDetail,
  deleteTicketDetail,
} from '../../api'
import { AxiosResponse } from 'axios'

export const refreshTickets = (restaurantSlug: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(setLoading())
    const ticketsList: AxiosResponse<any, any> | string =
      await getTicketList(restaurantSlug)
    if (typeof ticketsList !== 'string') {
      if (ticketsList.status === 200) {
        dispatch(setTickets(ticketsList.data))
      }
    }
    dispatch(setTickets([]))
  }
}

export const doTicketCreate = (ticket: ticketToServer, restaurant: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(setLoading())
    const response: AxiosResponse<any, any> | string = await createTicketDetail(
      ticket,
      restaurant,
    )
    if (typeof response !== 'string') {
      if (response.status === 200) {
        console.log('Ticket created')
      }
      dispatch(setAwaitingRefresh())
    }
  }
}

export const doTicketUpdate = (
  id: number,
  ticket: ticketToServer,
  restaurant: string,
) => {
  return async (dispatch: Dispatch) => {
    dispatch(setLoading())
    const response: AxiosResponse<any, any> | string = await updateTicketDetail(
      id,
      ticket,
      restaurant,
    )
    if (typeof response !== 'string') {
      if (response.status === 200) {
        console.log('Ticket updated')
      }
      dispatch(setAwaitingRefresh())
    }
  }
}

export const doTicketDelete = (id: number) => {
  return async (dispatch: Dispatch) => {
    dispatch(setLoading())
    const response: AxiosResponse<any, any> | string =
      await deleteTicketDetail(id)
    if (typeof response !== 'string') {
      if (response.status === 200) {
        console.log('Ticket deleted')
      }
      dispatch(setAwaitingRefresh())
    }
  }
}
