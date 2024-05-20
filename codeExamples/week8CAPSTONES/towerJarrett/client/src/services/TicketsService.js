import { AppState } from "../AppState"
import { Ticket } from "../models/Ticket"
import { api } from "./AxiosService.js"

class TicketsService {

    async getMyTickets() {
        const response = await api.get('account/tickets')
        AppState.myTickets = response.data.map(x => new Ticket(x))
    }

    async createTicket(data) {
        const response = await api.post(`api/tickets`, data)
        AppState.activeEventTickets.push(new Ticket(response.data))
    }
    async deleteTicket(id) {
        let isActive = true
        let index = AppState.activeEventTickets.findIndex(x => x.id == id)
        if (index == -1) {
            index = AppState.myTickets.findIndex(x => x.id == id)
            if (index == -1) throw new Error('Could not find ticket.')
            isActive = false
        }

        await api.delete(`api/tickets/${id}`)
        if (isActive) {
            AppState.activeEventTickets.splice(index, 1)
        } else {
            AppState.myTickets.splice(index, 1)
        }
    }
    async getTicketsForEvent(eventId) {
        AppState.activeEventTickets = null
        const response = await api.get(`api/events/${eventId}/tickets`)
        AppState.activeEventTickets = response.data.map(x => new Ticket(x))
    }
}

export const ticketsService = new TicketsService()