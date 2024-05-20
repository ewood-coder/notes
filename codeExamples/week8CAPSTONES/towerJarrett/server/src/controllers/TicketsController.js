import BaseController from "../utils/BaseController.js";
import { ticketsService } from "../services/TicketsService.js";
import { Auth0Provider } from "@bcwdev/auth0provider";

export class TicketsController extends BaseController {
    constructor() {
        super('api/tickets')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createTicket)
            .delete('/:ticketId', this.destroyTicket)
    }

    async createTicket(request, response, next) {
        try {
            const ticketData = request.body
            ticketData.accountId = request.userInfo.id
            const ticket = await ticketsService.createTicket(ticketData)
            response.send(ticket)
        } catch (error) {
            next(error)
        }
    }

    async destroyTicket(request, response, next) {
        try {
            const ticketId = request.params.ticketId
            const userId = request.userInfo.id
            const result = await ticketsService.destroyTicket(ticketId, userId)
            response.send(result)
        } catch (error) {
            next(error)
        }
    }
}