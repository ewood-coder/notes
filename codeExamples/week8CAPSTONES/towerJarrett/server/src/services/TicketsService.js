import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"

class TicketsService {
    async getTicketsByEvent(eventId) {
        const tickets = await dbContext.Ticket.find({ eventId: eventId }).populate('profile').populate('event')
        return tickets
    }
    async getTicketsByAccount(userId) {
        const tickets = await dbContext.Ticket.find({ accountId: userId }).populate('profile').populate('event')
        return tickets
    }
    async createTicket(ticketData) {
        const ticket = await dbContext.Ticket.create(ticketData)
        await ticket.populate('profile')
        await ticket.populate('event')
        return ticket
    }

    async destroyTicket(ticketId, userId) {
        const ticket = await dbContext.Ticket.findById(ticketId)
        if (!ticket) throw new Error('Could not find ticket by that ID.')
        if (ticket.accountId != userId) throw new Forbidden('You cannot delete a ticket that you did not create.')
        await ticket.deleteOne()
        return { status: 200, message: "Successfully deleted ticket." }
    }
}

export const ticketsService = new TicketsService()