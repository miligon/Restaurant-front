import { axiosR } from "./";

export const getRestaurantList = async() => {
    try {
        return await axiosR.get(`/api/restaurants/`)
    } catch (error) {
        console.log(error);
        return 'Error'
    }
}

export const getTicketList = async(restaurantSlug) => {
    try {
        return await axiosR.get(`/api/reservations/tickets/?restaurant=${restaurantSlug}`)
    } catch (error) {
        console.log(error);
        return 'Error'
    }
}

export const getTicketDetail = async(id, restaurantSlug) => {
    try {
        return await axiosR.get(`/api/reservations/tickets/${id}/`)
    } catch (error) {
        console.log(error);
        return 'Error'
    }
}

export const updateTicketDetail = async(id, ticketData, restaurantSlug) => {
    try {
        ticketData['restaurant']=restaurantSlug
        return await axiosR.put(`/api/reservations/tickets/${id}/`, ticketData)
    } catch (error) {
        console.log(error);
        return 'Error'
    }
}

export const createTicketDetail = async(ticketData, restaurantSlug) => {
    try {
        ticketData['restaurant']=restaurantSlug
        return await axiosR.post(`/api/reservations/tickets/`, ticketData)
    } catch (error) {
        console.log(error);
        return 'Error'
    }
}

export const deleteTicketDetail = async(id, restaurantSlug) => {
    try {
        return await axiosR.delete(`/api/reservations/tickets/${id}/`)
    } catch (error) {
        console.log(error);
        return 'Error'
    }
}