import { Auth0Provider } from "@bcwdev/auth0provider";
import { quotesService } from "../services/QuotesService.js";
import BaseController from "../utils/BaseController.js";




export class QuotesController extends BaseController {
  constructor() {
    super('api/quotes')
    this.router
      .get('', this.getRandomQuote)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createQuote)
  }

  async getRandomQuote(request, response, next) {
    try {
      const quote = await quotesService.getRandomQuote()
      response.send(quote)
    } catch (error) {
      next(error)
    }
  }

  async createQuote(request, response, next) {
    try {
      const quoteData = request.body
      const userInfo = request.userInfo // because this request is behind the use, i have this information available
      quoteData.authorId = userInfo.id // assign the authorId to the id of the logged in user
      const quote = await quotesService.createQuote(quoteData)
      response.send(quote)
    } catch (error) {
      next(error)
    }
  }
}
