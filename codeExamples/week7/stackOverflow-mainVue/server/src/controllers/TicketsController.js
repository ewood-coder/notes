import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { ticketsService } from "../services/TicketsService.js";


export class TicketsController extends BaseController {
  constructor() {
    super('api/tickets')
    this.router


      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.buyTicket)
      .delete('/:ticketId', this.deleteMyTicket)
  }

  async buyTicket(request, response, next) {
    try {
      const ticketData = request.body
      ticketData.accountId = request.userInfo.id
      const ticket = await ticketsService.buyTicket(ticketData)
      response.send(ticket)
    } catch (error) {
      next(error)
    }
  }
  async deleteMyTicket(request, response, next) {
    try {
      const ticketId = request.params.ticketId
      const userId = request.userInfo.id
      const message = await ticketsService.deleteMyTicket(ticketId, userId)
      response.send(message)
    } catch (error) {
      next(error)
    }

  }
}
