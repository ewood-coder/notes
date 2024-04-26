import { AppState } from "../AppState"
import { api } from "./AxiosService"
import { Ticket } from "../models/Ticket"

class TicketsService {

  async buyTicket(ticketData) {
    const response = await api.post(`api/tickets`, ticketData)
    console.log('buyingTicket', response.data)
    const newTicket = new Ticket(response.data)
    AppState.tickets.push(newTicket)
  }

  async getMyTickets() {
    const response = await api.get('account/tickets')
    console.log('getting my tickets', response.data)
    const myTickets = response.data.map(ticket => new Ticket(ticket))
    AppState.myTickets = myTickets
  }

  async getOtherPeoplesEventTickets(eventId) {
    const response = await api.get(`api/events/${eventId}/tickets`)
    console.log('getting others events', response.data)
    const othersTickets = response.data.map(ticket => new Ticket(ticket))
    AppState.othersTickets = othersTickets
  }

  async deleteMyTicket(myTicketId) {
    const response = await api.delete(`api/tickets/${myTicketId}`)
    console.log('deleting ticket', response.data)
    const indexToRemove = AppState.myTickets.findIndex(myTicket => myTicket.id == myTicketId)
    AppState.myTickets.splice(indexToRemove, 1)
  }
}

export const ticketsService = new TicketsService()