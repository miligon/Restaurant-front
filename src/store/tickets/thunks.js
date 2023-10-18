import { setTickets, setLoading, setAwaitingRefresh } from "./"
import { getTicketList, updateTicketDetail, createTicketDetail, deleteTicketDetail } from "../../api";

export const refreshTickets = (restaurantSlug) => {
    return async (dispatch) => {
        dispatch(setLoading());
        const ticketsList = await getTicketList(restaurantSlug)
        if (ticketsList.status === 200) {
            dispatch(setTickets(ticketsList.data))
        }
        else {
            // There should be a better way to handle this
            dispatch(setTickets([]));
        }
    }
}

export const doTicketCreate = (ticket, restaurant) => {
    return async (dispatch) => {
        dispatch(setLoading());
        const response = await createTicketDetail(ticket, restaurant);
        if (response.status === 200) {
            console.log("Ticket created")
        }
        dispatch(setAwaitingRefresh());
    }
}

export const doTicketUpdate = (id, ticket, restaurant) => {
    return async (dispatch) => {
        dispatch(setLoading());
        const response = await updateTicketDetail(id, ticket, restaurant);
        if (response.status === 200) {
            console.log("Ticket updated")
        }
        dispatch(setAwaitingRefresh());
    }
}

export const doTicketDelete = (id) => {
    return async (dispatch) => {
        dispatch(setLoading());
        const response = await deleteTicketDetail(id);
        if (response.status === 200) {
            console.log("Ticket deleted")
        }
        dispatch(setAwaitingRefresh());
    }
}
