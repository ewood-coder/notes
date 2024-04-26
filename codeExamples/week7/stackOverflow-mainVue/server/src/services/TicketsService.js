import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { eventsService } from "./EventsService.js"



class TicketsService {

  async buyTicket(ticketData) {
    const ticket = await dbContext.Tickets.create(ticketData)
    await ticket.populate('profile', 'name picture')
    await ticket.populate('event')
    return ticket
  }
  async getMyTickets(userId) {
    const myTickets = await dbContext.Tickets.find({ accountId: userId }).populate('event').populate('profile', 'name picture')
    return myTickets
  }
  async getOtherPeoplesEventTickets(eventId) {
    const eventTickets = await dbContext.Tickets.find({ eventId }).populate('profile', 'name picture')
    return eventTickets
  }

  async deleteMyTicket(ticketId, userId) {
    const ticketToDelete = await dbContext.Tickets.findById(ticketId).populate('event')
    if (!ticketToDelete) {
      throw new Error('Wait, there is no ticket?')
    }
    if (ticketToDelete.accountId != userId) {
      throw new Forbidden('oops, you are not authorized to delete this')
    }
    await ticketToDelete.deleteOne()
    // @ts-ignore
    return `You are no longer attending ${ticketToDelete.event.name}`
  }

}

export const ticketsService = new TicketsService()