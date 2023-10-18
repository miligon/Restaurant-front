import { axiosR } from '.'
import { ticketToServer } from '../store'

export const getRestaurantList = async () => {
  try {
    return await axiosR.get(`/api/restaurants/`)
  } catch (error) {
    console.log(error)
    return 'Error'
  }
}

export const getTicketList = async (restaurantSlug: string) => {
  try {
    return await axiosR.get(
      `/api/reservations/tickets/?restaurant=${restaurantSlug}`,
    )
  } catch (error) {
    console.log(error)
    return 'Error'
  }
}

export const getTicketDetail = async (id: number) => {
  try {
    return await axiosR.get(`/api/reservations/tickets/${id}/`)
  } catch (error) {
    console.log(error)
    return 'Error'
  }
}

export const updateTicketDetail = async (
  id: number,
  ticketData: ticketToServer,
  restaurantSlug: string,
) => {
  try {
    ticketData['restaurant'] = restaurantSlug
    return await axiosR.put(`/api/reservations/tickets/${id}/`, ticketData)
  } catch (error) {
    console.log(error)
    return 'Error'
  }
}

export const createTicketDetail = async (
  ticketData: ticketToServer,
  restaurantSlug: string,
) => {
  try {
    ticketData['restaurant'] = restaurantSlug
    return await axiosR.post(`/api/reservations/tickets/`, ticketData)
  } catch (error) {
    console.log(error)
    return 'Error'
  }
}

export const deleteTicketDetail = async (id: number) => {
  try {
    return await axiosR.delete(`/api/reservations/tickets/${id}/`)
  } catch (error) {
    console.log(error)
    return 'Error'
  }
}
